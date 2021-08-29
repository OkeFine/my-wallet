import React, { ReactNode, useReducer } from "react";

export const StoreContext = React.createContext<any>(null);

const initialState = { user: {}, token: null };
function appReducer(
  state: any = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "LOGIN": {
      const state = action.payload;
      // TODO: save token in localStorage
      localStorage.setItem("token", state.token);
      return state;
    }
    case "LOGOUT": {
      // TODO: delete token in localStorage
      localStorage.removeItem("token");
      return state;
    }
    case "DEDUCTION": {
      const { assets } = action.payload;
      const newState = {
        ...state,
        user: {
          ...state.user,
          assets: {
            ...state.user.assets,
            ...assets,
          },
        },
      };
      return newState;
    }
    default:
      return state;
  }
}

function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {});

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
