import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    contentContainer: {
        flexGrow: 1,
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
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 8,
    },
    faqItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
    },
    answerContainer: {
        backgroundColor: '#f1fafd',
        marginTop: 8,
        padding: 10,
        borderLeftWidth: 2,
        borderLeftColor: '#88c4f3',
        borderRadius: 4,
        overflow: 'visible',
    },
    answerText: {
        fontSize: 18,
        color: '#333',
    },
    chevron: {
        width: 20,
        height: 20,
    },
});
