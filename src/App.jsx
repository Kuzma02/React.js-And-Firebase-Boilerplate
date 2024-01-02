import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  // New movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(true);

  // update title state
  const [updatedTitle, setUpdatedTitle] = useState();

  // file upload state
  const [fileUpload, setFileUpload] = useState(null);

  // get reference to the collection
  const moviesCollectionRef = collection(db, "movies");

  // make function that wil immediately display list of movies when user loads the page
  const getMovieList = async () => {
    try {
      // READ THE DATA
      // SET THE MOVIE LIST
      // return all documents from specified collection
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      // target the movieDoc you want to delete
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {}
  };

  const updateMovieTitle = async (id) => {
    try {
      // target the movieDoc you want to delete
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
      getMovieList();
    } catch (error) {}
  };

  const uploadFile = async () => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (error) {
      console.error(error);
    }


  }

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    // add movie to the db
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Auth />

      <div>
        <input
          type="text"
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date..."
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
          checked={isNewMovieOscar}
        />
        <label>Received Oscar</label>
        <button onClick={onSubmitMovie}>Submit movie</button>
      </div>

      <div>
        {movieList.map((movie) => {
          return (
            <div>
              <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
                {movie.title}
              </h1>
              <p>Date: {movie.releaseDate}</p>

              <button onClick={() => deleteMovie(movie.id)}>
                Delete movie
              </button>

              <input
                type="text"
                placeholder="new title..."
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button onClick={() => updateMovieTitle(movie.id)}>
                Update Title
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
