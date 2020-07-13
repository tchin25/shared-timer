import React, { useState, useContext, useEffect, useRef } from "react";
import firebase from "../firebase.js";
import { TimeContext } from "./../TimeContext";
import moment from "moment";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";

const labelCss =
  "block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2";

const inputCss =
  "appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 shadow-inner";

const CreateTimerForm = (props) => {
  const timeContext = useContext(TimeContext);
  const [isSelectDate, setIsSelectDate] = useState(false);
  const form = useRef(null);
  const date = useRef(null);
  const hours = useRef(null);
  const minutes = useRef(null);
  const seconds = useRef(null);
  const description = useRef(null);
  const picker = useRef(null);

  useEffect(() => {
    const fillTimers = async () => {
      let fetchAllTimers = firebase.functions().httpsCallable("fetchAllTimers");
      let timers = await fetchAllTimers().catch((err) => {
        console.log("Error: " + err);
      });
      console.log(timers);
      timeContext.overwriteAllLocalTimers(timers.data);
    };
    fillTimers();
    return () => {
      timeContext.overwriteAllLocalTimers([]);
    };
  }, []);

  const setPicker = () => {
    if (picker.current.value === "time") {
      setIsSelectDate(true);
    } else {
      setIsSelectDate(false);
    }
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

  const submit = async (e) => {
    e.preventDefault();
    e.persist();
    if (customTimeValidator() && form.current.checkValidity()) {
      console.log("Form Submitted");
      let toSet;
      // Send to cloud functions and add to local timer list
      if (isSelectDate) {
        toSet = moment(date.current.value);
        console.log(toSet);
      } else {
        toSet = moment().add({
          hours: parseInt(hours.current.value),
          minutes: parseInt(minutes.current.value),
          seconds: parseInt(seconds.current.value),
        });
        console.log(toSet);
      }
      let saveTimer = firebase.functions().httpsCallable("saveTimer");
      let toSave = {
        dueTime: toSet.valueOf(),
        description: description.current.value,
      };
      let timerId = await saveTimer(toSave)
        .then((data) => data.data)
        .catch((err) => {
          console.log("Error: " + err);
        });
      console.log(timerId);
      timeContext.addTimer({ id: timerId, ...toSave });
      form.current.reset();
    } else {
      form.current.reportValidity();
    }
  };

  const customTimeValidator = () => {
    if (isSelectDate) {
      console.log(date.current.value);
      if (
        moment(date.current.value, moment.HTML5_FMT.DATETIME_LOCAL) > moment()
      ) {
        date.current.setCustomValidity("");
        return true;
      }
      date.current.setCustomValidity("Date Must Be In The Future");
      return false;
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
            ref={date}
            className={`${inputCss}`}
            id="end-date"
            type="datetime-local"
            name="end-date"
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
      <label className={`${labelCss}`} required htmlFor="select">
        Timer Options
      </label>
      <div className={`relative`}>
        <select
          ref={picker}
          name="select"
          className={`${inputCss}`}
          onChange={setPicker}
        >
          <option value="duration">Set Duration</option>
          <option value="time">Set End Time</option>
        </select>
        <div
          className={`absolute flex items-center inset-y-0 right-0 pr-2 text-gray-700`}
        >
          <Icon path={mdiChevronDown} size={1}></Icon>
        </div>
      </div>

      {renderTimePicker()}
      <div className="">
        <label className={`${labelCss}`} required htmlFor="description">
          Description
        </label>
        <input
          ref={description}
          className={`${inputCss}`}
          id="description"
          name="description"
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
