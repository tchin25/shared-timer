import React, { useState, useContext, useRef } from "react";
import firebase from '../firebase.js';
import { TimeContext } from "../TimeContext";

const labelCss =
  "block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2";

const inputCss =
  "appearance-none bg-gray-200 text-gray-700 rounded-l py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 shadow-inner";

const FetchTimerForm = () => {
  const passcode = useRef(null);
  const timeContext = useContext(TimeContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    // let fetchTimer = firebase.functions().httpsCallable('fetchTimer');
    // await fetchTimer(passcode.current.value).catch((err) => {
    //     console.log('Error: ' + err)
    // })
    passcode.current.value = "";
  };

  return (
    <form>
      <label className={`${labelCss}`} htmlFor="passcode">
        Timer Code
      </label>
      <div className="inline-flex">
        <input
          ref={passcode}
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
