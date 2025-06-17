const API_DOMAIN = 'http://localhost:8000';

const ENDPOINTS = {
    forgotPassword: `${API_DOMAIN}/api/v1/auth/forgot-password`,
    resetPassword: `${API_DOMAIN}/api/v1/auth/reset-password`,
    chatMessage: `${API_DOMAIN}/api/v1/chat/message`,
    questionsRemaining: `${API_DOMAIN}/api/v1/chat/questions-remaining`,
    userProfile: `${API_DOMAIN}/api/v1/users/profile`,
    register: `${API_DOMAIN}/api/v1/auth/register`,
    login: `${API_DOMAIN}/api/v1/auth/login`,
    userFeedback: `${API_DOMAIN}/api/v1/feedback`,
    deadlines : `${API_DOMAIN}/api/v1/deadlines`,
};

export { API_DOMAIN, ENDPOINTS };
