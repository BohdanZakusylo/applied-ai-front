const API_DOMAIN = 'http://localhost:8000';

const ENDPOINTS = {
    forgotPassword: `${API_DOMAIN}/api/v1/auth/forgot-password`,
    resetPassword: `${API_DOMAIN}/api/v1/auth/reset-password`,
    chatMessage: `${API_DOMAIN}/api/v1/chat/message`,
    userFeedback: `${API_DOMAIN}/api/v1/feedback`,
};

export { API_DOMAIN, ENDPOINTS };
