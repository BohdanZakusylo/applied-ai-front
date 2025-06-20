import { StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { AppColors } from '../assets/constants';

/**
 * Creates a function that returns theme-aware styles
 * Use this pattern across all components for consistent theming
 *
 * @example
 * // In your component's styles.ts:
 * export const useComponentStyles = createThemedStylesHook((colors) => ({
 *   container: {
 *     backgroundColor: colors.BACKGROUND,
 *   },
 *   text: {
 *     color: colors.BLACK,
 *   },
 * }));
 *
 * // In your component:
 * const styles = useComponentStyles();
 */
export function createThemedStylesHook<T extends StyleSheet.NamedStyles<T>>(
    styleCreator: (colors: AppColors) => T
) {
    return () => {
        const { colors } = useTheme();
        return StyleSheet.create(styleCreator(colors));
    };
}

/**
 * Common theme-aware styles used across multiple components
 */
export const useCommonStyles = createThemedStylesHook((colors) => ({
    screen: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
    },
    card: {
        backgroundColor: colors.WHITE,
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.BLACK,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colors.GRAY,
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: colors.LIGHT_GRAY,
        marginVertical: 12,
    },
}));

/**
 * Pre-defined dynamic colors for common use cases
 */
export const THEME_COLORS = {
    success: {
        light: '#4CAF50',
        dark: '#81C784',
    },
    error: {
        light: '#F44336',
        dark: '#E57373',
    },
    warning: {
        light: '#FF9800',
        dark: '#FFB74D',
    },
    info: {
        light: '#2196F3',
        dark: '#64B5F6',
    },
};
