import { Text, ColorValue, Image, ImageURISource, TouchableOpacity } from 'react-native';
import styles from './styles';
import { BASE_HIT_SLOP } from '../../assets/constants';

export type HomeNavigationTileProps = {
    imageSource: ImageURISource;
    label: string;
    onPress: () => void;
    color?: ColorValue;
    borderColor?: ColorValue;
};

const HomeNavigationTile = (props: HomeNavigationTileProps) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...(props?.borderColor ? { borderColor: props.borderColor } : {}),
                ...(props?.color ? { backgroundColor: props.color } : {}),
            }}
            hitSlop={BASE_HIT_SLOP}
            onPress={props.onPress}
        >
            <Image source={props.imageSource} style={styles.image} resizeMode="contain" />
            <Text style={styles.label} numberOfLines={2}>{props.label}</Text>
        </TouchableOpacity>
    );
};

export default HomeNavigationTile;
