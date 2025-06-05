import { useEffect } from 'react';
import Main from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { Appearance } from 'react-native';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
    useEffect(() => Appearance.setColorScheme('light'), []);

    return (
        <AuthProvider>
            <UserProvider>
                <NavigationContainer>
                    <Main />
                </NavigationContainer>
            </UserProvider>
        </AuthProvider>
    );
};

export default App;
