import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND, // Light purple background from screenshot
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 60,
        marginBottom: 20,
    },
    loadingBar: {
        height: 4,
        backgroundColor: COLORS.LIGHT_GRAY, // Light gray background for loading bar
        borderRadius: 2,
        overflow: 'hidden',
    },
    loadingFill: {
        height: '100%',
        backgroundColor: COLORS.SECONDARY_LIGHT, // Green color for the loading fill (matching the design)
        borderRadius: 2,
    },
});
