import React, { createContext, useReducer, ReactNode } from 'react';
import { AuthState } from '../assets/interfaces';

type AuthAction =
  | { type: 'SET_READY'; payload: boolean }
  | { type: 'SET_LOGGED_IN'; payload: boolean }
  | { type: 'SET_INITIAL_ROUTE'; payload: string };

const initialAuthState: AuthState = {
  ready: false,
  loggedIn: false,
  initialRoute: '',
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_READY':
      return { ...state, ready: action.payload };
    case 'SET_LOGGED_IN':
      return { ...state, loggedIn: action.payload };
    case 'SET_INITIAL_ROUTE':
      return { ...state, initialRoute: action.payload };
    default:
      return state;
  }
}

export const AuthContext = createContext<{state: AuthState; dispatch: React.Dispatch<AuthAction>;}>({
  state: initialAuthState,
  dispatch: () => null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
