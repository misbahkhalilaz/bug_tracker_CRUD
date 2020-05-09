import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers/reducer";
import { visibilityFilters } from "./actionTypes";
import { createLogger } from "redux-logger";

const logger = createLogger(); //middleware to log detailed view of store in console.

const initState = {
	//this is the final shape of our states in store
	visibilityFilter: visibilityFilters.SHOW_ALL,
	bugs: [
		// {
		// 	id: null,
		// 	description: "",
		// 	resolved: false,
		// },
	],
};

const store = createStore(reducer, initState, applyMiddleware(logger)); //store is created by giving the designed reducer, now its API is usable

export default store;
