import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#fdf3f8',
        paddingVertical: 48,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: 80,
        marginTop: 32,
        marginBottom: 32,
    },
    contentWrapper: {
        width: '100%',
        maxWidth: 360,
        alignSelf: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'left',
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 12,
        lineHeight: 22,
        textAlign: 'left',
    },
    bullets: {
        marginBottom: 16,
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    bulletSymbol: {
        fontSize: 16,
        marginRight: 6,
        lineHeight: 22,
    },
    bulletText: {
        flex: 1,
        fontSize: 16,
        lineHeight: 22,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    primaryButton: {
        backgroundColor: '#00C9A7',
        paddingVertical: 14,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginRight: 8,
    },
    secondaryButton: {
        backgroundColor: '#f0f0ff',
        paddingVertical: 14,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginLeft: 8,
    },
    primaryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    secondaryButtonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
