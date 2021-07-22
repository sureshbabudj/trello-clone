import React, { useReducer } from "react";
import { store, reducers } from "./reducers";

export const Context = React.createContext<any>(undefined);

export const StoreContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducers, store);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
