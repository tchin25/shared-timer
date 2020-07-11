import React, { useState, useContext, useRef } from "react";
import { TimeContext } from "./../TimeContext";
import moment from "moment";

const labelCss =
  "block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2";

const inputCss =
  "appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 shadow-inner";

const CreateTimerForm = (props) => {
  const timeContext = useContext(TimeContext);
  const [isSelectDate, setIsSelectDate] = useState(false);
  const form = useRef(null);
  const hours = useRef(null);
  const minutes = useRef(null);
  const seconds = useRef(null);

  const toggleDatePicker = () => {
    setIsSelectDate(!isSelectDate);
  };

  const restrictNumberInput = (e) => {
    e.persist();
    let value = parseInt(e.target.value);
    let max = parseInt(e.target.max);
    let min = parseInt(e.target.min);
    if (value < min) {
      e.target.value = e.target.min;
    } else if (value > max) {
      e.target.value = e.target.max;
    }
    console.log(e);
  };

  const submit = (e) => {
    e.preventDefault();
    e.persist();
    if (customTimeValidator() && form.current.checkValidity()) {
      console.log("Form Submitted");
      // Send to cloud functions and add to local timer list
      form.current.reset();
    } else {
      form.current.reportValidity();
    }
  };

  const customTimeValidator = () => {
    if (isSelectDate) {
      return true;
    } else if (
      !parseInt(hours.current.value) &&
      !parseInt(minutes.current.value) &&
      !parseInt(seconds.current.value)
    ) {
      minutes.current.setCustomValidity("Timer Must Be Filled Out");
      return false;
    }
    minutes.current.setCustomValidity("");
    return true;
  };

  const renderTimePicker = () => {
    if (isSelectDate) {
      return (
        <div>
          <label className={`${labelCss}`} htmlFor="end-date">
            Set End Date
          </label>
          <input
            className={`${inputCss}`}
            id="end-date"
            type="datetime-local"
            name="end-date"
            min={moment(timeContext.currentTime).toISOString()}
            required
          ></input>
        </div>
      );
    } else {
      return (
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 mb-6 md:pr-2 md:mb-0">
            <label className={`${labelCss}`} htmlFor="hours">
              Hours
            </label>
            <input
              ref={hours}
              className={`${inputCss}`}
              type="number"
              id="hours"
              name="hours"
              min="0"
              max="99"
              placeholder="0"
              onChange={restrictNumberInput}
            ></input>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:px-2 md:mb-0">
            <label className={`${labelCss}`} htmlFor="minutes">
              Minutes
            </label>
            <input
              ref={minutes}
              className={`${inputCss}`}
              type="number"
              id="minutes"
              name="minutes"
              min="0"
              max="59"
              placeholder="0"
              onChange={restrictNumberInput}
            ></input>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:pl-2 md:mb-0">
            <label className={`${labelCss}`} htmlFor="seconds">
              Seconds
            </label>
            <input
              ref={seconds}
              className={`${inputCss}`}
              type="number"
              id="seconds"
              name="seconds"
              min="0"
              max="59"
              placeholder="0"
              onChange={restrictNumberInput}
            ></input>
          </div>
        </div>
      );
    }
  };

  return (
    <form ref={form} className={`mt-2`}>
      <p className={`title-font font-medium text-lg text-gray-900 text-center`}>
        Set End Time
      </p>
      {renderTimePicker()}
      <div className="">
        <label className={`${labelCss}`} required htmlFor="description">
          Description
        </label>
        <input
          className={`${inputCss}`}
          id="description"
          type="text"
          placeholder="Description"
        ></input>
      </div>
      <div className="flex flex-col items-center mt-4">
        <button
          className="w-full bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 border-4 text-white py-1 px-2 rounded shadow-sm"
          type="submit"
          value="Submit"
          onClick={submit}
        >
          Create Timer
        </button>
      </div>
    </form>
  );
};

export default CreateTimerForm;
