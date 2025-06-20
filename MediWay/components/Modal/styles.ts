import { StyleSheet } from 'react-native';
import { getThemeColor } from '../../utils/useColors';

export default StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalBox: {
        backgroundColor: getThemeColor('WHITE'),
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: getThemeColor('GRAY'),
        color: getThemeColor('BLACK'),
        marginBottom: 15,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 12,
        backgroundColor: getThemeColor('SECONDARY_LIGHT'),
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: getThemeColor('LIGHT_GRAY'),
    },
    buttonText: {
        color: getThemeColor('WHITE'),
        fontWeight: 'bold',
    },
});
