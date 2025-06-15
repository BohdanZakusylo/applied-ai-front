import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/constants";

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
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
    color: COLORS.BLACK,
  },
  section: {
    backgroundColor: COLORS.WHITE,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
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
    color: COLORS.GRAY,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
  label: {
    fontSize: 15,
    color: COLORS.GRAY,
    flex: 1,
  },
  value: {
    fontSize: 15,
    color: COLORS.BLACK,
    textAlign: 'right',
    flex: 1,
  },
  editIcon: {
    width: 18,
    height: 18,
  },
});