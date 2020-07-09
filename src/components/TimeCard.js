import React, { useContext } from "react";
import Clock from "./Clock";
import moment from "moment";
import { TimeContext } from "../TimeContext";

let borderCss = "";

const TimeCard = ({
  dueTime = moment({ hour: 18, minute: 43, second: 0 }),
  description = "Test Description",
  ...props
}) => {
  const currentTime = useContext(TimeContext);
  return (
    <div className="flex sm:flex-row flex-col items-center px-2 py-2 rounded-lg shadow-md sm:justify-start justify-center text-center sm:text-left">
      <Clock dueTime={dueTime} paused={true}></Clock>
      <div className="flex-grow sm:pl-8">
        <h2 className="title-font font-medium text-lg text-gray-900">
          {dueTime.toString()}
        </h2>
        <h3 className="text-gray-500 mb-3">
          {moment(currentTime).to(dueTime)}
        </h3>
        <p className="mb-4">{description}</p>
      </div>
    </div>
  );
};

export default TimeCard;
