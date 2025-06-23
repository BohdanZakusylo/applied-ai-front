import React, { createContext, useReducer, ReactNode } from 'react';
import { User } from '../assets/interfaces';
import { ENDPOINTS } from '../assets/api';

type UserAction =
    | { type: 'SET_USER'; payload: User | null }
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

export const UserContext = createContext<{ state: User | null; dispatch: React.Dispatch<UserAction>; fetchUser: (jwt: string) => Promise<User | null> }>({
    state: initialUserState,
    dispatch: () => null,
    fetchUser: async () => null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, initialUserState);

    const fetchUser = async (jwt: string): Promise<User | null> => {
        try {
            const response = await fetch(ENDPOINTS.userProfile, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
            });

            const data = await response.json();
            return data.user;
        } catch (err) {
            console.error('Fetch failed:', err);
            return null;
        }
    };

    return (
        <UserContext.Provider value={{ state, dispatch, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};
