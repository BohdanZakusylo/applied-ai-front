import { StyleSheet } from 'react-native';
import { getThemeColor } from '../../utils/useColors';

export default StyleSheet.create({
    container: {
        backgroundColor: getThemeColor('BACKGROUND'),
        paddingTop: 48,
        paddingHorizontal: 24,
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        width: '100%',
        height: 80,
        marginVertical: 5,
    },
    contentWrapper: {
        width: '100%',
        maxWidth: 360,
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 10,
        flex: 1,
    },
    legend: {
        width: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    currentLocationCircle: {
        width: 12,
        height: 12,
        backgroundColor: getThemeColor('SECONDARY_LIGHT'),
        borderWidth: 2,
        borderColor: getThemeColor('SECONDARY_DARK'),
        borderRadius: 100,
    },
    buttons: {
        width: '100%',
        flex: 1,
    },
    buttonsContainer: {
        gap: 10,
    },
});
