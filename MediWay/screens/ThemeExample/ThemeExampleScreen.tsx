import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../../components/Button/Button';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import ThemedComponent from '../../components/ThemedComponent/ThemedComponent';
import { createThemedStylesHook, useCommonStyles } from '../../utils/themingUtils';
import { createDynamicColor } from '../../utils/useColors';

// Create theme-aware styles for this screen
const useStyles = createThemedStylesHook((colors) => ({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
    },
    header: {
        backgroundColor: colors.PRIMARY_DARK,
        padding: 16,
        alignItems: 'center',
    },
    headerTitle: {
        color: colors.WHITE,
        fontSize: 24,
        fontWeight: 'bold',
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        color: colors.BLACK,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    colorPreview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    colorItem: {
        width: '48%',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
        borderWidth: 1,
    },
    colorName: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    colorValue: {
        fontSize: 12,
    },
    buttonContainer: {
        margin: 16,
    },
}));

const ThemeExampleScreen = () => {
    const { toggleTheme, colors, isDarkMode } = useTheme();
    const styles = useStyles();
    const commonStyles = useCommonStyles();

    // Example of component-specific dynamic colors
    const headerTextColor = createDynamicColor('#00553E', '#FFFFFF');

    // Create color preview items
    const colorItems = [
        { name: 'PRIMARY_LIGHT', value: colors.PRIMARY_LIGHT },
        { name: 'PRIMARY_DARK', value: colors.PRIMARY_DARK },
        { name: 'SECONDARY_LIGHT', value: colors.SECONDARY_LIGHT },
        { name: 'SECONDARY_DARK', value: colors.SECONDARY_DARK },
        { name: 'TERTIARY', value: colors.TERTIARY },
        { name: 'BACKGROUND', value: colors.BACKGROUND },
        { name: 'WHITE', value: colors.WHITE },
        { name: 'BLACK', value: colors.BLACK },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: isDarkMode ? headerTextColor.dark : headerTextColor.light }]}>
                    MediWay Theme System
                </Text>
            </View>

            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Current Theme: {isDarkMode ? 'Dark' : 'Light'}</Text>
                    <ThemeToggle label="Toggle Dark Mode" />
                </View>

                <View style={commonStyles.card}>
                    <Text style={commonStyles.title}>Theme-Aware Components</Text>
                    <Text style={commonStyles.subtitle}>
                        Components that automatically adapt to theme changes
                    </Text>
                    <View style={commonStyles.divider} />

                    <ThemedComponent
                        title="Themed Component Example"
                        description="This component uses the theme context to adapt its colors based on the selected theme."
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Color Palette Preview</Text>
                    <View style={styles.colorPreview}>
                        {colorItems.map(item => (
                            <View
                                key={item.name}
                                style={[
                                    styles.colorItem,
                                    { backgroundColor: item.value },
                                    { borderColor: colors.GRAY },
                                ]}
                            >
                                <Text style={[
                                    styles.colorName,
                                    { color: item.name === 'WHITE' ? colors.BLACK : colors.WHITE },
                                ]}>
                                    {item.name}
                                </Text>
                                <Text style={[
                                    styles.colorValue,
                                    { color: item.name === 'WHITE' ? colors.BLACK : colors.WHITE },
                                ]}>
                                    {`${String(item.value)}`}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        label="Themed Button Example"
                        onPress={toggleTheme}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ThemeExampleScreen;
