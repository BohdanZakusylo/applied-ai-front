import React, { useState } from 'react';
import AuthStack from "./navigation/AuthStack";
import HomeStack from "./navigation/HomeStack";
import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

const Main = () => {
    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // This will be managed by auth context later
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleSplashComplete = () => {
        setIsReady(true);
    };

    const handleGetStarted = () => {
        setShowRegister(true);
    };

    const handleLogin = () => {
        setShowLogin(true);
    };

    const handleBackToWelcome = () => {
        setShowLogin(false);
        setShowRegister(false);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setShowLogin(false);
        setShowRegister(false);
    };

    // Show splash screen while loading
    if (!isReady) {
        return <SplashScreen onLoadingComplete={handleSplashComplete} />;
    }

    // If user is logged in, show home
    if (isLoggedIn) {
        return <HomeStack />;
    }

    // If user wants to login or register, show auth stack
    if (showLogin || showRegister) {
        return <AuthStack onBack={handleBackToWelcome} onLoginSuccess={handleLoginSuccess} initialRoute={showRegister ? 'Register' : 'Login'} />;
    }

    // Otherwise show welcome screen
    return <WelcomeScreen onGetStarted={handleGetStarted} onLogin={handleLogin} />;
};

export default Main;