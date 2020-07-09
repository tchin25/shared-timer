import React from "react";
import "./tailwind.output.css";
import { TimeContextProvider } from "./TimeContext";
import TimeCard from "./components/TimeCard";
import Clock from "./components/Clock";

function App() {
  return (
    <TimeContextProvider>
      <div className="h-screen m-auto container flex flex-col justify-start items-center">
          <div className="my-4">
            <Clock></Clock>
          </div>
        <span className="rounded-full w-64 h-1 bg-red-500 mb-4"></span>
        <TimeCard></TimeCard>
      </div>
    </TimeContextProvider>
  );
}

export default App;
