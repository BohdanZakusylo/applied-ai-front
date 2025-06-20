import React, { createContext, useReducer, ReactNode } from 'react';
import { AuthState } from '../assets/interfaces';
import { secureStorage } from '../services/storage/storage';
import { Alert } from 'react-native';

type AuthAction =
  | { type: 'SET_READY'; payload: boolean }
  | { type: 'SET_LOGGED_IN'; payload: boolean }
  | { type: 'SET_INITIAL_ROUTE'; payload: string };

const initialAuthState: AuthState = {
  ready: false,
  loggedIn: false,
  initialRoute: 'Login',
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

export const AuthContext = createContext<{state: AuthState; dispatch: React.Dispatch<AuthAction>; signOut: (alert?: boolean) => void}>({
  state: initialAuthState,
  dispatch: () => null,
  signOut: () => null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const signOut = (alert?: boolean) => {
    if (alert) {
        Alert.alert('Logout', 'You have been signed out');
    }

    dispatch({ type: 'SET_READY', payload: true });
    dispatch({ type: 'SET_LOGGED_IN', payload: false });
    dispatch({ type: 'SET_INITIAL_ROUTE', payload: 'Login' });
    secureStorage.delete('jwt');
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
