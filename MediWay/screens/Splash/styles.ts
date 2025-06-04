import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F0FF', // Light purple background from screenshot
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
        backgroundColor: '#E0E0E0', // Light gray background for loading bar
        borderRadius: 2,
        overflow: 'hidden',
    },
    loadingFill: {
        height: '100%',
        backgroundColor: '#29B0FF', // Green color for the loading fill (matching the design)
        borderRadius: 2,
    },
});
