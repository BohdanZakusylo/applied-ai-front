import { StyleSheet } from 'react-native';
import { getThemeColor } from '../../utils/useColors';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        backgroundColor: getThemeColor('BACKGROUND'),
        paddingHorizontal: 20,
        paddingTop: 70,
        paddingBottom: 70,
        minHeight: '100%',
    },
    user: {
        width: 90,
        height: 90,
        borderRadius: 45,
        alignSelf: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 25,
        color: getThemeColor('BLACK'),
    },
    section: {
        backgroundColor: getThemeColor('WHITE'),
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: getThemeColor('BLACK'),
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 3,
        marginTop: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: getThemeColor('GRAY'),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: getThemeColor('LIGHT_GRAY'),
    },
    label: {
        fontSize: 15,
        color: getThemeColor('GRAY'),
        flex: 1,
    },
    value: {
        fontSize: 15,
        color: getThemeColor('BLACK'),
        textAlign: 'right',
        flex: 1,
    },
    editIcon: {
        width: 18,
        height: 18,
    },
});
