import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    button: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: COLORS.SECONDARY_LIGHT,
        padding: 10,
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    buttonSelected: {
        borderColor: COLORS.PRIMARY_LIGHT,
    },
    name: {
        color: COLORS.BLACK,
        fontWeight: 400,
        fontSize: 15,
    },
    address: {
        color: COLORS.BLACK,
        fontWeight: 400,
        fontSize: 10,
    },
    distance: {
        color: COLORS.BLACK,
        fontWeight: 400,
        fontSize: 15,
    },
    fromMe: {
        color: COLORS.BLACK,
        fontWeight: 400,
        fontSize: 10,
    },
    icon: {
        width: 35,
        height: 35,
        flexGrow: 0.3,
        resizeMode: 'contain',
    },
    descriptionRegion: {
        paddingLeft: 5,
        flexGrow: 1,
        justifyContent: 'center',
        width: 100,
    },
    distanceRegion: {
        width: 50,
        height: '100%',
        flexGrow: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
