import { combineReducers } from "redux";
import flightReducer from "./BusReducer";


export default combineReducers({
    search : flightReducer
})