export default (state, action) => {
  switch (action.type) {
    case "ADD_TIMER":
      const found = state.some((timer) => timer.id === action.payload.id);
      if (!found) {
        return [action.payload, ...state];
      }
      console.log("Timer already loaded");
      return state;
    case "OVERWRITE_ALL_LOCAL_TIMERS":
      if (action.payload) {
        return [...action.payload];
      }
      return [];
    case "DELETE_TIMER":
      return state.filter((timers) => timers.id !== action.payload);
    default:
      console.log("Time Context Called");
      return state;
  }
};
