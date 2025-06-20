import { StyleSheet } from 'react-native';

// Create a function that returns themed styles
export const createButtonStyles = () => {
    return StyleSheet.create({
        button: {
            padding: 8,
            borderRadius: 16,
            height: 64,
            width: 240,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        },
        label: {
            textAlign: 'center',
            textAlignVertical: 'center',
            fontWeight: 500,
            fontSize: 16,
        },
    });
};

// Default export for backward compatibility
export default StyleSheet.create({
    button: {
        backgroundColor: '#00B9C1', // Default color for SSR or before theme is loaded
        padding: 8,
        borderRadius: 16,
        height: 64,
        width: 240,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: '#FFFFFF', // Default white color
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 500,
        fontSize: 16,
    },
});
