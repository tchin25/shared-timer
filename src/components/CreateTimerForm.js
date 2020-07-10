import React, { useContext } from "react";
import { TimeContext } from "./../TimeContext";
import moment from "moment";

const CreateTimerForm = (props) => {
  const timeContext = useContext(TimeContext);

  return (
    <form>
      <div>
        <label for="party">End Date</label>
        <input
          id="end-date"
          type="datetime-local"
          name="end-date"
          min={moment(timeContext.currentTime).toISOString()}
          required
        ></input>
      </div>
      <div className="">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="description"
        >
          Description
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="description"
          type="text"
          placeholder="Description"
        ></input>
      </div>
    </form>
  );
};

export default CreateTimerForm;
