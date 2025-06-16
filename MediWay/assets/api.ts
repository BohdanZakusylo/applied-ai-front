// 10.0.2.2 is the special IP Android emulators use to access the host machine's localhost
const API_DOMAIN = 'http://10.0.2.2:8000';

const ENDPOINTS = {
    forgotPassword: `${API_DOMAIN}/api/v1/auth/forgot-password`,
    resetPassword: `${API_DOMAIN}/api/v1/auth/reset-password`,
    chatMessage: `${API_DOMAIN}/api/v1/chat/message`,
    userProfile: `${API_DOMAIN}/api/v1/users/profile`,
    register: `${API_DOMAIN}/api/v1/auth/register`,
    login: `${API_DOMAIN}/api/v1/auth/login`,
};

export { API_DOMAIN, ENDPOINTS };
