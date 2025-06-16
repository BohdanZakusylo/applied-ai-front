const API_DOMAIN = 'http://192.168.166.178:8000';

const ENDPOINTS = {
    forgotPassword: `${API_DOMAIN}/api/v1/auth/forgot-password`,
    resetPassword: `${API_DOMAIN}/api/v1/auth/reset-password`,
    chatMessage: `${API_DOMAIN}/api/v1/chat/message`,
    userProfile: `${API_DOMAIN}/api/v1/users/profile`,
    register: `${API_DOMAIN}/api/v1/auth/register`,
    login: `${API_DOMAIN}/api/v1/auth/login`,
    userFeedback: `${API_DOMAIN}/api/v1/feedback`,
};

export { API_DOMAIN, ENDPOINTS };
