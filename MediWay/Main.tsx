import AuthStack from './navigation/AuthStack';
import HomeStack from './navigation/HomeStack';
import GetStartedStack from './navigation/GetStartedStack';

const Main = () => {
    const isReady = true;
    const isLoggedIn = true;

    return (
        <>
            {isReady ? (
                isLoggedIn ? <HomeStack /> : <AuthStack />
            ) : (
                <GetStartedStack />
            )}
        </>
    );
};

export default Main;
