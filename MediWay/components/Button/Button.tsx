import { Text, TouchableOpacity, TouchableOpacityProps, TextProps } from 'react-native';
import styles, { createButtonStyles } from './styles';
import { BASE_HIT_SLOP } from '../../assets/constants';
import { useTheme } from '../../contexts/ThemeContext';

export type ButtonProps = {
    label: string,
    textProps?: TextProps,
} & TouchableOpacityProps;

const Button = (props: ButtonProps) => {
    // Get theme-aware styles if context is available
    const { colors } = useTheme();
    const themedStyles = colors ? createButtonStyles() : styles;

    return (
        <TouchableOpacity
            {...props}
            style={[{ backgroundColor: colors.TERTIARY }, themedStyles.button, props?.style]}
            hitSlop={BASE_HIT_SLOP}
        >
            <Text
                {...props.textProps}
                style={[{ color: colors.WHITE }, themedStyles.label, props.textProps?.style]}
            >
                {props.label}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
