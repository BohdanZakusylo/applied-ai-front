import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './styles';

interface ThemeToggleProps {
    label?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
    label = 'Dark Mode',
}) => {
    const { isDarkMode, toggleTheme, colors } = useTheme();

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: isDarkMode ? colors.GRAY_DARK : colors.WHITE,
                borderColor: colors.LIGHT_GRAY,
            },
        ]}>
            <Text style={[
                styles.label,
                { color: colors.BLACK },
            ]}>
                {label}
            </Text>
            <Switch
                trackColor={{ false: '#767577', true: colors.PRIMARY_DARK }}
                thumbColor={isDarkMode ? colors.PRIMARY_LIGHT : '#f4f3f4'}
                ios_backgroundColor="#767577"
                onValueChange={toggleTheme}
                value={isDarkMode}
            />
        </View>
    );
};

export default ThemeToggle;
