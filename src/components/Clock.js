import React, { useReducer, useEffect } from "react";
import moment from "moment";

const timeReducer = (state, action) => {
  if (action.type === "increment") {
    return state.clone().add(1, "second");
  }
};

const fractionToDegrees = (numerator, denominator) => {
  numerator = numerator % denominator;
  return (360 / denominator) * numerator;
};

let clockCss = "relative rounded-full w-40 h-40";
let wrapCss =
  "absolute top-0 left-0 m-auto overflow-hidden rounded-full border-solid border-white shadow-inner bg-white w-40 h-40";
let hourCss =
  "absolute h-8 w-2 m-auto bg-black rounded-full origin-bottom shadow-sm left-0 bottom-0 right-0";
let minuteCss =
  "absolute h-16 w-2 m-auto bg-black rounded-full origin-bottom shadow-sm left-0 bottom-0 right-0";
let secondCss =
  "absolute h-12 w-1 m-auto bg-red-500 rounded-full origin-bottom shadow-sm left-0 bottom-0 right-0";
let dotCss =
  "absolute top-0 left-0 right-0 bottom-0 w-4 h-4 m-auto bg-white border-solid border-2 border-black rounded-full z-1";

const Clock = ({ dueTime = moment(), paused = false, ...props }) => {
  const [time, dispatchTime] = useReducer(timeReducer, dueTime);

  const hourHandDegrees = () => {
    return fractionToDegrees(time.hour() + time.minute() / 60, 12);
  };

  const minuteHandDegrees = () => {
    return fractionToDegrees(time.minute() + time.second() / 60, 60);
  };

  useEffect(() => {
    let interval = null;
    if (!paused) {
      interval = setInterval(() => {
        dispatchTime({ type: "increment" });
      }, 1000);
    }

    return () => {
      if (!paused) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <div className={`${clockCss}`}>
      <div className={`${wrapCss}`}>
        <span
          className={`${hourCss}`}
          style={{ top: "-20%", transform: `rotate(${hourHandDegrees()}deg)` }}
        ></span>
        <span
          className={`${minuteCss}`}
          style={{
            top: "-40%",
            transform: `rotate(${minuteHandDegrees()}deg)`,
          }}
        ></span>
        <span
          className={`${secondCss}`}
          style={{ top: "-30%", transform: `rotate(${time.second() * 6}deg)` }}
        ></span>
        <span className={`${dotCss}`}></span>
      </div>
    </div>
  );
};

export default Clock;
