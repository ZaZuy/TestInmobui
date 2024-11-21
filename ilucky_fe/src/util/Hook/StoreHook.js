import React, { createContext, useReducer } from "react";

const initialState = {
  userInfo: "abc",
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    let { value, field } = action.payload;
    switch (action.type) {
      case "set_field":
        return {
          ...state,
          [field]: value,
        };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
