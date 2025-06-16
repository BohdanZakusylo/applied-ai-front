import { StyleSheet } from 'react-native';
import { getThemeColor } from '../../utils/useColors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getThemeColor('BACKGROUND'),
        padding: 20,
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    logo: {
        width: '100%',
        height: 96,
        marginTop: 32,
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: getThemeColor('BLACK'),
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 8,
        color: getThemeColor('BLACK'),
    },
    faqItem: {
        borderBottomWidth: 1,
        borderBottomColor: getThemeColor('LIGHT_GRAY'),
        paddingBottom: 8,
        marginBottom: 8,
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 18,
        flex: 1,
        marginRight: 8,
        color: getThemeColor('BLACK'),
    },
    answerContainer: {
        backgroundColor: getThemeColor('SECONDARY_EXTRA_LIGHT'),
        marginTop: 8,
        padding: 10,
        borderLeftWidth: 2,
        borderLeftColor: getThemeColor('SECONDARY_LIGHT'),
        borderRadius: 4,
        overflow: 'visible',
    },
    answerText: {
        fontSize: 18,
        color: getThemeColor('GRAY'),
    },
    chevron: {
        width: 20,
        height: 20,
    },
});
