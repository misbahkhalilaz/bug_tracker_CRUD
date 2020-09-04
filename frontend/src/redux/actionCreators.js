//create and return action objects here
import * as actions from "./actionTypes";

export const readData = (data) => ({
  type: actions.READ_DATA,
  payload: data.map((d) => ({
    id: d._id,
    description: d.description,
    resolved: d.resolved,
  })),
});

export const bugAdded = (description) => ({
  //return an action object
  type: actions.BUG_ADDED,
  payload: { description },
});

export const bugRemoved = (id) => ({
  type: actions.BUG_REMOVED,
  payload: {
    id,
  },
});

export const bugResolved = (id) => ({
  type: actions.BUG_RESOLVED,
  payload: {
    id,
  },
});

export const bugUpdated = (id, description) => ({
  type: actions.BUG_UPDATED,
  payload: {
    id,
    description,
  },
});

export const changeFilter = (visibilityFilter) => ({
  type: actions.CHANGE_FILTER,
  payload: {
    visibilityFilter,
  },
});
