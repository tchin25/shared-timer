import React, { useState, useEffect, createContext } from "react";
import moment from "moment";

// Create Context Object
export const TimeContext = createContext(-1);

// Create a provider for components to consume and subscribe to changes
export const TimeContextProvider = (props) => {
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TimeContext.Provider value={currentTime}>
      {props.children}
    </TimeContext.Provider>
  );
};
