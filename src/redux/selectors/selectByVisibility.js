import { visibilityFilters } from "../actionTypes";

const filterBugs = (stateObj) => {
	switch (stateObj.visibilityFilter) {
		case visibilityFilters.SHOW_ACTIVE:
			return stateObj.bugs.filter((bug) => bug.resolved === false);

		case visibilityFilters.SHOW_COMP:
			return stateObj.bugs.filter((obj) => obj.resolved === true);

		default:
			return stateObj.bugs;
	}
};

export default filterBugs;
