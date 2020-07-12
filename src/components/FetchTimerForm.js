import React, { useState, useContext, useRef } from "react";
import firebase from "../firebase.js";
import { TimeContext } from "../TimeContext";
import moment from "moment";

const labelCss =
  "block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2";

const inputCss =
  "appearance-none bg-gray-200 text-gray-700 rounded-l py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 shadow-inner";

const FetchTimerForm = () => {
  const passcode = useRef(null);
  const timeContext = useContext(TimeContext);
  const [user, loading, error] = useAuthState(firebase.auth());

  const onSubmit = async (e) => {
    // Save timer to user
    e.preventDefault();

    if (passcode.current.checkValidity()) {
      let fetchTimer = firebase.functions().httpsCallable("fetchTimer");
      let timer = await fetchTimer(passcode.current.value).catch((err) => {
        console.log("Error: " + err);
      });
      timeContext.addTimer(timer);
      passcode.current.reset();
    } else {
      passcode.current.reportValidity();
    }
  };

  return (
    <form ref={passcode}>
      <label className={`${labelCss}`} htmlFor="passcode">
        Timer Code
      </label>
      <div className="inline-flex">
        <input
          className={`${inputCss}`}
          id="passcode"
          type="text"
          placeholder="Passcode"
          required
        ></input>

        <button
          className="bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 border-4 text-white py-1 px-2 rounded-r shadow"
          type="submit"
          value="Submit"
          onClick={onSubmit}
        >
          Fetch Timer
        </button>
      </div>
    </form>
  );
};

export default FetchTimerForm;
