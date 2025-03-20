import React, { useState } from "react";
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Menu, X } from "lucide-react"; // For icons

const Login = () => {
  const [userObj, setUserObj] = useState();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("User", user);
        setUserObj(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUserObj(currentUser);
    });
  }, []);
  if (!userObj) return null;
  return (
    <div>
      {/* {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <img src={user.photoURL} alt="User Avatar" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )} */}
    </div>
  );
};

export default Login;
