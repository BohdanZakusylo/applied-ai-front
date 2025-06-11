import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
  screen: {
    padding: 24,
    flex: 1,
    backgroundColor: '#FDF5F8',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 96,
    marginTop: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  dropdown: {
    width: '100%',
    marginBottom: 16,
    borderColor: '#ccc',
  },
  inputLarge: {
    width: '100%',
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  link: {
    marginTop: 12,
    fontSize: 12,
    color: '#000',
    textDecorationLine: 'underline',
  },
});