import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    mapWrapper: {
        borderWidth: 2,
        borderColor: COLORS.GRAY,
        borderRadius: 2,
    },
    map: {
        height: 300,
        width: 300,
    },
});
