import React, { useReducer, useEffect } from "react";
import moment from "moment";

const timeReducer = (state, action) => {
  if (action.type === "increment") {
    return state.clone().add(1, "second");
  }
};

const Clock = ({ epochTime = moment(), paused = false, ...props }) => {
  const [time, dispatchTime] = useReducer(timeReducer, epochTime);

  useEffect(() => {
    let interval = setInterval(() => {
      dispatchTime({ type: "increment" });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>{time.toString()}</div>;
};

export default Clock;
