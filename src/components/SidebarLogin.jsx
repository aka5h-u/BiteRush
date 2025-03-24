import React from "react";
import { X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { updateName } from "../utils/userSlice";

const SidebarLogin = () => {
  const dispatch = useDispatch();
  const [userObj, setUserObj] = useState(null);
  const [isOpen, setIsOpen] = useState(true); // Added to control sidebar visibility

  // Handle sign out
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        setUserObj(null);
        console.log("Signed out successfully");
        dispatch(updateName("Sign In"));
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  // Handle sign in
  const signInHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUserObj(user);
        console.log("Signed in user:", user.displayName);
      })
      .catch((error) => {
        console.error("Sign in error:", error.message);
      });
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUserObj(currentUser);
      console.log("Signed in user:", currentUser.displayName);
      dispatch(updateName(currentUser?.displayName));
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-gray-700"
        onClick={() => setIsOpen(false)}
      >
        <X size={24} />
      </button>

      {userObj ? (
        // Signed in state
        <>
          <h2 className="text-xl font-bold mb-4">Hey, {userObj.displayName}</h2>
          <ul className="space-y-2">
            <button onClick={signOutHandler}>
              <li className="p-2 hover:bg-gray-100 rounded flex items-center gap-2">
                <span>Logout</span>
              </li>
            </button>
          </ul>
        </>
      ) : (
        // Signed out state
        <>
          <h2 className="text-xl font-bold mb-4">Sign In</h2>
          <ul className="space-y-2">
            <button onClick={signInHandler}>
              <li className="p-2 hover:bg-gray-100 rounded flex items-center gap-2">
                <FcGoogle size={24} />
                <span>Sign in with Google</span>
              </li>
            </button>
          </ul>
        </>
      )}
    </div>
  );
};

export default SidebarLogin;
