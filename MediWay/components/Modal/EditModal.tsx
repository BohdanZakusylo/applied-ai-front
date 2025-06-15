import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

type Field = {
  name: string;
  label: string;
  value?: string;
  secure?: boolean;
};

type EditModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (values: Record<string, string>) => void;
  fields: Field[];
};

const EditModal: React.FC<EditModalProps> = ({ visible, onClose, onSave, fields }) => {
  const [formState, setFormState] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialValues: Record<string, string> = {};
    fields.forEach(field => {
      initialValues[field.name] = field.value || '';
    });
    setFormState(initialValues);
  }, [fields]);

  const handleChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formState);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <ScrollView>
              {fields.map(field => (
                <TextInput
                  key={field.name}
                  placeholder={field.label}
                  style={styles.input}
                  value={formState[field.name]}
                  onChangeText={value => handleChange(field.name, value)}
                  secureTextEntry={field.secure || false}
                />
              ))}

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
