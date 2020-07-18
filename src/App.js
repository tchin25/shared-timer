import React, { useEffect, useContext } from "react";
import "./tailwind.output.css";
import { TimeContext } from "./TimeContext";
import CreateTimerForm from "./components/CreateTimerForm";
import FetchTimerForm from "./components/FetchTimerForm";
import TimeCard from "./components/TimeCard";
import Clock from "./components/Clock";
import LoginButton from "./components/LoginButton";
import DefaultFooter from "./components/DefaultFooter";
import moment from "moment";
import firebase from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const timeContext = useContext(TimeContext);
  const [user, loading] = useAuthState(firebase.auth());

  useEffect(() => {
    const fillTimers = async () => {
      let fetchAllTimers = firebase.functions().httpsCallable("fetchAllTimers");
      let timers = await fetchAllTimers().catch((err) => {
        console.log("Error: " + err);
      });
      timeContext.overwriteAllLocalTimers(timers.data);
    };
    if (user) {
      fillTimers();
    }
  }, [user]);

  const timerList = timeContext.timers.map((timer) => (
    <div key={timer.id} className="my-2">
      <TimeCard {...timer}></TimeCard>
    </div>
  ));

  return (
    <div
      className="relative min-h-screen m-auto overflow-x-hidden container flex flex-col justify-center items-center"
      style={{ maxWidth: "95vw" }}
    >
      <div className="my-4">
        <Clock></Clock>
      </div>
      <h2 className="title-font font-medium text-lg text-gray-900 mb-4">
        {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
      </h2>
      <LoginButton></LoginButton>
      {user && <CreateTimerForm></CreateTimerForm>}
      <FetchTimerForm></FetchTimerForm>
      <span className="rounded-full w-64 h-1 bg-red-500 my-4"></span>
      {loading ? 'Loading...' : timerList}
      <DefaultFooter></DefaultFooter>
    </div>
  );
}

export default App;
