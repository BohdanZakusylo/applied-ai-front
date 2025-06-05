export interface Profile {
    email: string;
}

export interface User {
    username: string;
    profile: Profile;
}

export interface AuthState {
    ready: boolean;
    loggedIn: boolean;
    initialRoute: string;
}
