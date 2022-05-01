import { combineReducers } from "redux"
import main from "./main"
import counterReducter from "./counterReducter"

const rootReducer = combineReducers({
  main: main,
  counter: counterReducter
})

export default rootReducer;
