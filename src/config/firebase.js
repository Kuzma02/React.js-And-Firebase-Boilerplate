
// whenever you want to start new application in firebase you need intitializeApp
import { initializeApp } from "firebase/app";

// import authentication in the project
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyByJU0ARGxUb2-8frJKeETU9OGy21CSsuc",
  authDomain: "fir-course-a1b33.firebaseapp.com",
  projectId: "fir-course-a1b33",
  storageBucket: "fir-course-a1b33.appspot.com",
  messagingSenderId: "441397093259",
  appId: "1:441397093259:web:ec42ae925fa296b555c58e",
  measurementId: "G-E69EN9CFPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);