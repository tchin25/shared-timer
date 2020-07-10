import React, { useState, useEffect, useReducer, createContext } from "react";
import moment from "moment";
import TimeContextReducer from "./TimeContextReducer";

// Create Context Object
export const TimeContext = createContext(-1);

// Create a provider for components to consume and subscribe to changes
export const TimeContextProvider = (props) => {
  const [currentTime, setCurrentTime] = useState();
  const [timers, timersDispatch] = useReducer(TimeContextReducer, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function addTimer(id) {
    timersDispatch({
      type: "ADD_TIMER",
      payload: id,
    });
  }

  function deleteTimer(id) {
    timersDispatch({
      type: "DELETE_TIMER",
      payload: id,
    });
  }

  return (
    <TimeContext.Provider
      value={{ currentTime, timers, addTimer, deleteTimer }}
    >
      {props.children}
    </TimeContext.Provider>
  );
};
