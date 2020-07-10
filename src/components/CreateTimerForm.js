import React, { useContext } from "react";
import { TimeContext } from "./../TimeContext";
import moment from "moment";

const labelCss =
  "block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2";

const inputCss =
  "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500";

const CreateTimerForm = (props) => {
  const timeContext = useContext(TimeContext);

  return (
    <form>
      <div>
        <label className={`${labelCss}`} for="end-date">
          Set End Date
        </label>
        <input
          className={`${inputCss}`}
          id="end-date"
          type="datetime-local"
          name="end-date"
          min={moment(timeContext.currentTime).toISOString()}
        ></input>
      </div>
      <div>
        <label className={`${labelCss}`} for="countdown">
          Timer Length
        </label>
        <input
          className={`${inputCss}`}
          id="countdown"
          type="time"
          name="countdown"
          step="1"
        ></input>
      </div>
      <div className="">
        <label className={`${labelCss}`} for="description">
          Description
        </label>
        <input
          className={`${inputCss}`}
          id="description"
          type="text"
          placeholder="Description"
        ></input>
      </div>
    </form>
  );
};

export default CreateTimerForm;
