import { Text, TouchableOpacity, TouchableOpacityProps, TextProps } from 'react-native';
import styles from './styles';
import { BASE_HIT_SLOP } from '../../assets/constants';

export type ButtonProps = {
    label: string,
    buttonProps?: TouchableOpacityProps,
    textProps?: TextProps,
};

const Button = (props: ButtonProps) => {
    return (
        <TouchableOpacity {...props.buttonProps} style={[styles.button, props.buttonProps?.style]} hitSlop={BASE_HIT_SLOP}>
            <Text {...props.textProps} style={[styles.label, props.textProps?.style]}>{props.label}</Text>
        </TouchableOpacity>
    );
};

export default Button;
