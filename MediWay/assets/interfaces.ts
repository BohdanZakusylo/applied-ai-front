export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    insurance_provider: string;
    general_practitioner: string;
    medical_information: string;
}

export interface AuthState {
    ready: boolean;
    loggedIn: boolean;
    initialRoute: string;
}
