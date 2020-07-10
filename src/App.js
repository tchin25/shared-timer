import React, { useContext } from "react";
import "./tailwind.output.css";
import { TimeContext } from "./TimeContext";
import CreateTimerForm from "./components/CreateTimerForm"
import TimeCard from "./components/TimeCard";
import Clock from "./components/Clock";
import moment from "moment";

function App() {
  const timeContext = useContext(TimeContext);
  return (
    <div className="h-screen m-auto container flex flex-col justify-start items-center">
      <div className="my-4">
        <Clock></Clock>
      </div>
      <h2 className="title-font font-medium text-lg text-gray-900 mb-4">
        {moment(timeContext.currentTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}
      </h2>
      <CreateTimerForm></CreateTimerForm>
      <span className="rounded-full w-64 h-1 bg-red-500 my-4"></span>
      <TimeCard></TimeCard>
    </div>
  );
}

export default App;
