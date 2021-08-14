import React, { createContext, useReducer } from "react";
import { IAction } from "../models/IAction";
import { IRace } from "../models/IRace";
import Reducer from "./Reducer";

const initialState: IRace = {
  name: "New race",
  courses: [],
  classes: [],
};

const Store: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext<{
  state: IRace,
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});
export default Store;
