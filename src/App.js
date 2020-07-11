import React, { useContext } from "react";
import "./tailwind.output.css";
import { TimeContext } from "./TimeContext";
import CreateTimerForm from "./components/CreateTimerForm";
import FetchTimerForm from "./components/FetchTimerForm";
import TimeCard from "./components/TimeCard";
import Clock from "./components/Clock";
import LoginButton from "./components/LoginButton";
import moment from "moment";
import firebase from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const timeContext = useContext(TimeContext);
  const [user, loading, error] = useAuthState(firebase.auth());

  const timerList = timeContext.timers.map((timer) => (
    <div key={timer.id} className="my-2">
      <TimeCard {...timer}></TimeCard>
    </div>
  ));

  return (
    <div className="h-screen m-auto container flex flex-col justify-start items-center">
      <div className="my-4">
        <Clock></Clock>
      </div>
      <h2 className="title-font font-medium text-lg text-gray-900 mb-4">
        {moment(timeContext.currentTime).format(
          "dddd, MMMM Do YYYY, h:mm:ss a"
        )}
      </h2>
      <LoginButton></LoginButton>
      {user && <CreateTimerForm></CreateTimerForm>}
      <FetchTimerForm></FetchTimerForm>
      <span className="rounded-full w-64 h-1 bg-red-500 my-4"></span>
      {timerList}
    </div>
  );
}

export default App;
