import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeToggleProps {
    label?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
    label = 'Dark Mode' 
}) => {
    const { isDarkMode, toggleTheme, colors } = useTheme();

    return (
        <View style={[
            styles.container, 
            { backgroundColor: colors.WHITE }
        ]}>
            <Text style={[
                styles.label, 
                { color: colors.BLACK }
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ThemeToggle;
