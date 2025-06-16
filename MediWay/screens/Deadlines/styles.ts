import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  addButton: {
    backgroundColor: COLORS.PRIMARY,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.WHITE,
    marginTop: -2,
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
    color: COLORS.GRAY,
    textAlign: 'center',
    marginTop: 8,
  },
  deadlineItem: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.BLACK,
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
    color: COLORS.WHITE,
  },
  deadlineMessage: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  deadlineEmail: {
    fontSize: 14,
    color: COLORS.GRAY,
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
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    padding: 20,
    width: '85%',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: COLORS.BLACK,
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
    color: COLORS.BLACK,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
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
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  saveButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  buttonText: {
    fontWeight: '500',
  },
  saveButtonText: {
    color: COLORS.WHITE,
  },
  cancelButtonText: {
    color: COLORS.BLACK,
  },
});
