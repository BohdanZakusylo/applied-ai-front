import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.BACKGROUND,
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
        color: COLORS.BLACK,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 12,
        lineHeight: 22,
        textAlign: 'left',
        color: COLORS.BLACK,
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
        color: COLORS.BLACK,
    },
    bulletText: {
        flex: 1,
        fontSize: 16,
        lineHeight: 22,
        color: COLORS.BLACK,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    primaryButton: {
        backgroundColor: COLORS.TERTIARY,
        paddingVertical: 14,
        borderRadius: 15,
        flex: 1,
        alignItems: 'center',
        marginRight: 8,
    },
    secondaryButton: {
        backgroundColor: COLORS.WHITE,
        paddingVertical: 14,
        borderRadius: 15,
        flex: 1,
        alignItems: 'center',
        marginLeft: 8,
    },
    primaryButtonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold',
        fontSize: 16,
    },
    secondaryButtonText: {
        color: COLORS.TERTIARY,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
