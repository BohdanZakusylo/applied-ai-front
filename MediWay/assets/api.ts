const API_DOMAIN = 'http://localhost:8000';

const ENDPOINTS = {
    forgotPassword: `${API_DOMAIN}/api/v1/auth/forgot-password`,
    resetPassword: `${API_DOMAIN}/api/v1/auth/reset-password`,
    chatMessage: `${API_DOMAIN}/api/v1/chat/message`,
    userProfile: `${API_DOMAIN}/api/v1/users/profile`,
    register: `${API_DOMAIN}/api/v1/auth/register`,
    login: `${API_DOMAIN}/api/v1/auth/login`,
    logout: `${API_DOMAIN}/api/v1/auth/logout`,
};

export { API_DOMAIN, ENDPOINTS };
