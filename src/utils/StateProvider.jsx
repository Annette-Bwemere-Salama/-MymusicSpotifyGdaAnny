import { createContext, useReducer, useContext } from "react";
export const StateContext = createContext();

// eslint-disable-next-line react/prop-types
export const StateProvider = ({ children, initialState, reducer }) => (
    // eslint-disable-next-line react/react-in-jsx-scope
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
