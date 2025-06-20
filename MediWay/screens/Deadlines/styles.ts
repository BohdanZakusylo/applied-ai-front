import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';
import { getThemeColor } from '../../utils/useColors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getThemeColor('BACKGROUND'),
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 8,
    },
    headerWithButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 8,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: getThemeColor('BLACK'),
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: getThemeColor('BLACK'),
    },
    addButton: {
        backgroundColor: COLORS.PRIMARY,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deadlinesList: {
        flex: 1,
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 16,
        color: getThemeColor('GRAY'),
        textAlign: 'center',
        marginTop: 8,
    },
    deadlineItem: {
        backgroundColor: getThemeColor('WHITE'),
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: getThemeColor('BLACK'),
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    categoryBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '500',
        color: getThemeColor('WHITE'),
    },
    deadlineMessage: {
        fontSize: 16,
        fontWeight: '500',
        color: getThemeColor('BLACK'),
        marginBottom: 8,
    },
    deadlineEmail: {
        fontSize: 14,
        color: getThemeColor('GRAY'),
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 12,
    },
    actionButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginLeft: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: getThemeColor('WHITE'),
        borderRadius: 8,
        padding: 20,
        width: '85%',
        shadowColor: getThemeColor('BLACK'),
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: getThemeColor('BLACK'),
    },
    inputLabel: {
        fontSize: 14,
        color: getThemeColor('BLACK'),
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: getThemeColor('LIGHT_GRAY'),
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 16,
        color: getThemeColor('BLACK'),
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: getThemeColor('LIGHT_GRAY'),
        borderRadius: 4,
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4,
    },
    cancelButton: {
        backgroundColor: getThemeColor('LIGHT_GRAY'),
    },
    saveButton: {
        backgroundColor: COLORS.PRIMARY,
    },
    buttonText: {
        fontWeight: '500',
    },
    saveButtonText: {
        color: getThemeColor('WHITE'),
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: getThemeColor('BLACK'),
    },
    retryButton: {
        backgroundColor: COLORS.PRIMARY,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 16,
    },
    retryButtonText: {
        color: getThemeColor('WHITE'),
        fontWeight: '500',
    },
    floatingActionButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#2196F3', // Explicit blue color for better visibility
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    floatingActionButtonText: {
        fontSize: 32,
        fontWeight: '600',
        color: getThemeColor('BLACK'),
        marginTop: -3,
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: getThemeColor('WHITE'),
    },
    editButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.PRIMARY,
        padding: 4,
    },
    deleteButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.DANGER,
        padding: 4,
    },
    deadlineActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    deadlineContent: {
        flex: 1,
    },
    deadlineHeader: {
        marginBottom: 4,
    },
});
