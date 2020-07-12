import React from "react";
import firebase from '../firebase.js';
import { TimeContext } from "../TimeContext";
import { useAuthState } from "react-firebase-hooks/auth";

const login = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};
const logout = () => {
  firebase.auth().signOut();
};

const LoginButton = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const timeContext = useContext(TimeContext);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    let fetchAllTimers = firebase.functions().httpsCallable("fetchAllTimers");
    let timers = await fetchAllTimers().catch((err) => {
      console.log("Error: " + err);
    });
    timeContext.overwriteAllLocalTimers(timers);
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button
          className="w-64 bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 border-4 text-white py-1 px-2 rounded shadow-sm"
          onClick={logout}
        >
          Log out
        </button>
      </div>
    );
  }
  return (
    <button
      className="w-64 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 border-4 text-white py-1 px-2 rounded shadow-sm"
      onClick={login}
    >
      Log in to create and save timers
    </button>
  );
};

export default LoginButton;
