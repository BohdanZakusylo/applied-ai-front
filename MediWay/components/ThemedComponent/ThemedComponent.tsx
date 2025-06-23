import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors, createDynamicColor } from '../../utils/useColors';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemedComponentProps {
    title: string;
    description: string;
}

/**
 * A sample themed component to demonstrate the new color system
 */
const ThemedComponent: React.FC<ThemedComponentProps> = ({ title, description }) => {
    // Get theme-aware colors
    const colors = useColors();

    const { isDarkMode } = useTheme();

    // Example of dynamic colors for specific component needs
    const highlightColor = createDynamicColor('#FF9800', '#FFB74D');

    return (
        <View style={[
            styles.container,
            { backgroundColor: colors.BACKGROUND },
        ]}>
            <View style={[
                styles.header,
                { backgroundColor: colors.TERTIARY },
            ]}>
                <Text style={[
                    styles.title,
                    { color: colors.WHITE },
                ]}>
                    {title}
                </Text>
            </View>

            <View style={styles.content}>
                <Text style={[
                    styles.description,
                    { color: colors.BLACK },
                ]}>
                    {description}
                </Text>

                <Text style={[
                    styles.highlight,
                    { color: isDarkMode ? highlightColor.dark : highlightColor.light },
                ]}>
                    This text uses a component-specific dynamic color
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    highlight: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 8,
    },
});

export default ThemedComponent;
