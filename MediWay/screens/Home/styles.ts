import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { getThemeColor } from '../../utils/useColors';

interface HomeStyles {
    screen: ViewStyle;
    logo: ImageStyle;
    intro: TextStyle;
    tiles: ViewStyle;
    row: ViewStyle;
    deadlinesButton: ViewStyle;
    deadlinesButtonText: TextStyle;
    deadlinesButtonIcon: ImageStyle;
    modalOverlay: ViewStyle;
    modalContent: ViewStyle;
    modalTitle: TextStyle;
    modalInput: TextStyle | ViewStyle;
    categoryLabel: TextStyle;
    categoryOptions: ViewStyle;
    categoryOption: ViewStyle;
    categoryOptionSelected: ViewStyle;
    categoryText: TextStyle;
    categoryTextSelected: TextStyle;
    modalButtons: ViewStyle;
    modalButton: ViewStyle;
    cancelButton: ViewStyle;
    saveButton: ViewStyle;
    modalButtonText: TextStyle;
    cancelButtonText: TextStyle;
    createButtonText: TextStyle;
}

const styles = StyleSheet.create<HomeStyles>({
    screen: {
        backgroundColor: getThemeColor('BACKGROUND'),
        width: '100%',
        height: '100%',
        padding: 16,
        gap: 8,
    },
    logo: {
        width: '100%',
        height: 96,
        marginTop: 32,
    },
    intro: {
        color: getThemeColor('BLACK'),
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 20,
        paddingBottom: 32,
    },
    tiles: {
        marginBottom: 24,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    deadlinesButton: {
        position: 'absolute',
        right: 20,
        bottom: 80,
        backgroundColor: COLORS.PRIMARY,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    deadlinesButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 3,
    },
    deadlinesButtonIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.BLACK,
        marginBottom: 16,
        textAlign: 'center',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 12,
        marginBottom: 16,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    categoryLabel: {
        fontSize: 16,
        color: COLORS.BLACK,
        marginBottom: 8,
    },
    categoryOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    categoryOption: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
    },
    categoryOptionSelected: {
        backgroundColor: COLORS.PRIMARY,
        borderColor: COLORS.PRIMARY,
    },
    categoryText: {
        color: COLORS.BLACK,
    },
    categoryTextSelected: {
        color: '#FFFFFF',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#DDDDDD',
    },
    saveButton: {
        backgroundColor: COLORS.PRIMARY,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    createButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default styles;
