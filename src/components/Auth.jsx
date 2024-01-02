import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";


import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // get current user logged in email
  console.log(auth?.currentUser?.photoURL);

  const signIn = async () => {
    try {
      // creating user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      // sign in with Google popup
      await signInWithPopup(auth, googleProvider);
    } catch (error) {}
  };

  const logout = async () => {
    try {
      // signing out
      await signOut(auth);
    } catch (error) {}
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email..."
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password..."
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Auth;
