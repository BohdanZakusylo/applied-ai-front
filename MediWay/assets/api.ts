const API_DOMAIN = 'https://applied-ai-back.onrender.com';

const ENDPOINTS = {
    forgotPassword: `${API_DOMAIN}/api/v1/auth/forgot-password`,
    resetPassword: `${API_DOMAIN}/api/v1/auth/reset-password`,
    chatMessage: `${API_DOMAIN}/api/v1/chat/message`,
    questionsRemaining: `${API_DOMAIN}/api/v1/chat/questions-remaining`,
    userProfile: `${API_DOMAIN}/api/v1/users/profile`,
    register: `${API_DOMAIN}/api/v1/auth/register`,
    login: `${API_DOMAIN}/api/v1/auth/login`,
    userFeedback: `${API_DOMAIN}/api/v1/feedback`,
    deadlines: `${API_DOMAIN}/api/v1/deadlines`,
    newCHat: `${API_DOMAIN}/api/v1/chat/new-chat`,
    getHistory: `${API_DOMAIN}/api/v1/chat/history`,
    getChats: `${API_DOMAIN}/api/v1/chat/chats`,
    deleteChats: `${API_DOMAIN}/api/v1/chat/delete`
};

export { API_DOMAIN, ENDPOINTS };
