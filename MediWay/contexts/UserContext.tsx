import React, { createContext, useReducer, ReactNode } from 'react';
import { User } from '../assets/interfaces';

type UserAction =
    | { type: 'SET_USER'; payload: User }
    | { type: 'CLEAR_USER' };

const initialUserState: User | null = null;

function userReducer(state: User | null, action: UserAction): User | null {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'CLEAR_USER':
            return null;
        default:
            return state;
    }
}

export const UserContext = createContext<{state: User | null; dispatch: React.Dispatch<UserAction>;}>({
    state: initialUserState,
    dispatch: () => null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, initialUserState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
