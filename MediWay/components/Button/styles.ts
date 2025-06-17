import { StyleSheet } from 'react-native';
import { useColors } from '../../utils/useColors';

// Create a function that returns themed styles
export const createButtonStyles = () => {
  const colors = useColors();
  
  return StyleSheet.create({
    button: {
        backgroundColor: colors.TERTIARY,
        padding: 8,
        borderRadius: 16,
        height: 64,
        width: 240,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: colors.WHITE,
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
