import { CLEAR_USER, SET_USER } from "../actions/main";

let stateInit = {
  email: "",
  user_name: ""
};

const mainReducter = (state = stateInit, action) => {
  switch (action.type) {
    case SET_USER:
      console.log(12121, action.payloads);
      return {
        ...state,
        email: action.payloads.email,
        user_name: action.payloads.user_name
      };
    case CLEAR_USER:
      return { email: "", user_name: "" };
    default:
      return { ...state };
  }
};

export default mainReducter;
