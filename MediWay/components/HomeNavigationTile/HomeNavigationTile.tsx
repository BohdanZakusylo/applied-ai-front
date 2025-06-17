import { Text, ColorValue, Image, ImageURISource, TouchableOpacity } from 'react-native';
import styles from './styles';
import { BASE_HIT_SLOP } from '../../assets/constants';
import { useTheme } from '../../contexts/ThemeContext';

export type HomeNavigationTileProps = {
    imageSource: ImageURISource;
    label: string;
    onPress: () => void;
    color?: ColorValue;
    borderColor?: ColorValue;
};

const HomeNavigationTile = (props: HomeNavigationTileProps) => {
    const { colors, isDarkMode } = useTheme();
    
    // Default colors based on theme
    const defaultBackgroundColor = isDarkMode ? colors.GRAY_DARK : colors.HOME_BUTTON_PRIMARY;
    const defaultBorderColor = isDarkMode ? colors.PRIMARY_DARK : colors.PRIMARY_DARK;
    
    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                backgroundColor: props?.color || defaultBackgroundColor,
                borderColor: props?.borderColor || defaultBorderColor,
            }}
            hitSlop={BASE_HIT_SLOP}
            onPress={props.onPress}
        >
            <Image source={props.imageSource} style={styles.image} resizeMode="contain" />
            <Text style={[styles.label, { color: colors.BLACK }]} numberOfLines={2}>{props.label}</Text>
        </TouchableOpacity>
    );
};

export default HomeNavigationTile;
