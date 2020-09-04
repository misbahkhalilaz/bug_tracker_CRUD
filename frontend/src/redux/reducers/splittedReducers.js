import { CHANGE_FILTER, visibilityFilters } from "../actionTypes";
import * as actions from "../actionTypes";
import { message } from "antd";
// let lastId = 0;

export function visibilityFilter(state = visibilityFilters.SHOW_ALL, action) {
  if (action.type === CHANGE_FILTER) return action.payload.visibilityFilter;
  else return state;
}

export function bugs(state = [], action) {
  switch (action.type) {
    case actions.BUG_ADDED:
      if (action.payload.description === "") return state;
      let id = Math.random();
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "http://localhost:4000/create?description=" +
          action.payload.description +
          "&id=" +
          id,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) =>
          result === "1"
            ? message.success("Bug Added")
            : message.error("Error occured")
        )
        .catch((error) => console.log("error", error));

      return [
        ...state,
        {
          id: id,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case actions.BUG_REMOVED:
      fetch(
        "http://localhost:4000/delete?id=" + action.payload.id,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) =>
          result === "1"
            ? message.warn("Bug deleted")
            : message.error("Error occured")
        )
        .catch((error) => console.log("error", error));
      return state.filter((bug) => bug.id !== action.payload.id);

    case actions.BUG_RESOLVED:
      return state.map((bug) => {
        if (bug.id === action.payload.id)
          fetch(
            "http://localhost:4000/updateRes?id=" +
              action.payload.id +
              "&resolved=" +
              !bug.resolved,
            requestOptions
          )
            .then((response) => response.text())
            .then((result) =>
              result === "1"
                ? message.success("Updated")
                : message.error("error occured")
            )
            .catch((error) => console.log("error", error));
        return bug.id !== action.payload.id
          ? bug
          : { ...bug, resolved: !bug.resolved };
      });

    case actions.BUG_UPDATED:
      fetch(
        "http://localhost:4000/updateDesc?id=" +
          action.payload.id +
          "&description=" +
          action.payload.description,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) =>
          result === "1"
            ? message.success("Updated")
            : message.error("error occured")
        )
        .catch((error) => console.log("error", error));
      return state.map((bug) =>
        bug.id !== action.payload.id
          ? bug
          : { ...bug, description: action.payload.description }
      );

    case actions.READ_DATA:
      return state.concat(action.payload);

    default:
      return state;
  }
}
