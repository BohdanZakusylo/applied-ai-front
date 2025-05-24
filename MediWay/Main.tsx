import AuthStack from "./navigation/AuthStack";
import HomeStack from "./navigation/HomeStack";
import GetStartedStack from "./navigation/GetStartedStack";

const Main = () => {
    const isReady = false;
    const isLoggedIn = false;

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