import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    TextInput,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './styles';
import { BASE_HIT_SLOP } from '../../assets/constants';

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

    const { colors } = useTheme();

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
                    <View style={[styles.modalBox, { backgroundColor: colors.WHITE }]}>
                        <ScrollView>
                            {fields.map(field => (
                                <TextInput
                                    key={field.name}
                                    placeholder={field.label}
                                    placeholderTextColor={colors.LIGHT_GRAY}
                                    style={[styles.input, { borderColor: colors.GRAY, color: colors.BLACK }]}
                                    value={formState[field.name]}
                                    onChangeText={value => handleChange(field.name, value)}
                                    secureTextEntry={field.secure || false}
                                />
                            ))}

                            <View style={styles.buttonRow}>
                                <TouchableOpacity hitSlop={BASE_HIT_SLOP} style={styles.button} onPress={handleSave}>
                                    <Text style={[styles.buttonText, { color: colors.WHITE }]}>Save</Text>
                                </TouchableOpacity>

                                <TouchableOpacity hitSlop={BASE_HIT_SLOP} style={[styles.button, styles.cancelButton, { backgroundColor: colors.LIGHT_GRAY }]} onPress={onClose}>
                                    <Text style={[styles.buttonText, { color: colors.WHITE }]}>Cancel</Text>
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
