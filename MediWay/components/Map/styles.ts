import { StyleSheet } from 'react-native';
import { getThemeColor } from '../../utils/useColors';

export default StyleSheet.create({
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
