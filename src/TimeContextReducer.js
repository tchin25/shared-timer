export default (state, action) => {
  switch (action.type) {
    case "ADD_TIMER":
      return [action.payload, ...state];
    case "OVERWRITE_ALL_LOCAL_TIMERS":
        return [...action.payload];
    case "DELETE_TIMER":
      return state.filter((timers) => timers.id !== action.payload);
    default:
      console.log("Time Context Called");
      return state;
  }
};
