import { StyleSheet } from 'react-native';
import { getThemeColor } from '../../utils/useColors';

export default StyleSheet.create({
    button: {
        backgroundColor: getThemeColor('HOME_BUTTON_PRIMARY'),
        borderColor: getThemeColor('PRIMARY_LIGHT'),
        borderWidth: 2,
        borderRadius: 8,
        width: 160,
        height: 128,
    },
    image: {
        width: '100%',
        height: 80,
    },
    label: {
        color: getThemeColor('BLACK'),
        textAlign: 'center',
        width: '100%',
        paddingHorizontal: 16,
        marginTop: -8,
        flexWrap: 'wrap',
        fontWeight: '400',
        fontSize: 16,
    },
});
