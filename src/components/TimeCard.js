import React, { useState, useContext } from "react";
import Clock from "./Clock";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { TimeContext } from "../TimeContext";
import firebase from "../firebase.js";
import Icon from "@mdi/react";
import { mdiDelete, mdiDeleteEmpty } from "@mdi/js";

const codeCss =
  "block tracking-wide text-gray-700 text-xs font-bold mt-2";

const TimeCard = ({
  dueTime = moment({ hour: 18, minute: 43, second: 0 }),
  description = "Test Description",
  id = -1,
  ...props
}) => {
  const timeContext = useContext(TimeContext);
  const [hover, setHover] = useState(false);
  const [user] = useAuthState(firebase.auth());

  const deleteTimer = () => {
    if (user) {
      let deleteTimerFunc = firebase.functions().httpsCallable("deleteTimer");
      deleteTimerFunc(id).catch((err) => {
        console.log("Error: " + err);
      });
    }
    timeContext.deleteTimer(id);
  };

  return (
    <div className="relative bg-gray-100 flex sm:flex-row flex-col items-center px-4 py-2 rounded-lg shadow-md sm:justify-start justify-center text-center sm:text-left">
      <Clock dueTime={moment(dueTime)} paused={true}></Clock>
      <div className="sm:pl-8" style={{width: "24rem"}}>
        <h2 className="title-font font-medium text-lg text-gray-900">
          {moment(dueTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}
        </h2>
        <h3 className="text-gray-500 mb-3">
          {moment(timeContext.currentTime).to(dueTime)}
        </h3>
        <p className="mb-4">{description}</p>
        <p className={`absolute bottom-0 mb-2 ${codeCss}`}>Timer Code: <span className={`text-red-500`}>{id}</span></p>
      </div>
      <button onClick={deleteTimer}>
        <Icon
          path={hover ? mdiDeleteEmpty : mdiDelete}
          size={1}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          title="Delete Timer"
          className={`hover:text-red-700 text-red-500 absolute right-0 bottom-0 mb-2 mr-2 cursor-pointer`}
        ></Icon>
      </button>
    </div>
  );
};

export default TimeCard;
