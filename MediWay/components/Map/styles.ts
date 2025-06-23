import { StyleSheet } from 'react-native';
import { getThemeColor } from '../../utils/useColors';

export default StyleSheet.create({
    noPermissionWrapper: {
        padding: 16,
        alignItems: 'center',
    },
    noPermissionText: {
        marginBottom: 16,
    },
    mapWrapper: {
        borderWidth: 2,
        borderColor: getThemeColor('GRAY'),
        borderRadius: 2,
    },
    map: {
        height: 300,
        width: 300,
    },
});
