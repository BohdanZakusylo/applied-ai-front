import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import styles from './styles';
import { BASE_HIT_SLOP } from '../../assets/constants';
import { LatLng } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { getDistanceBetween } from '../../services/location/location';
import { useTheme } from '../../contexts/ThemeContext';

export type MapButtonProps = TouchableOpacityProps & {
    locationName: string;
    address: string;
    originalLocation?: LatLng;
    location: LatLng;
    selected: boolean;
}

const MapButton = (props: MapButtonProps) => {
    const [distance, setDistance] = useState<string>('');

    const { colors } = useTheme();

    useEffect(() => {
        if (props.originalLocation) {
            getDistanceBetween(props.originalLocation, props.location).then((res) => setDistance(res.rows[0].elements[0].distance.text));
        }
    }, [props.location, props.originalLocation]);

    return (
        <TouchableOpacity hitSlop={BASE_HIT_SLOP} style={props.selected ? [styles.button, styles.buttonSelected] : styles.button} {...props}>
            <Image style={[styles.icon, { tintColor: colors.GRAY }]} source={require('../../assets/images/map/gp-icon.png')} />

            <View style={styles.descriptionRegion}>
                <Text numberOfLines={1} style={[styles.name, { color: colors.BLACK }]}>{props.locationName}</Text>
                <Text numberOfLines={1} style={[styles.address, { color: colors.BLACK }]}>{props.address}</Text>
            </View>

            <View style={styles.distanceRegion}>
                <Text numberOfLines={1} style={[styles.distance, { color: colors.BLACK }]}>{distance}</Text>
                <Text numberOfLines={1} style={[styles.fromMe, { color: colors.BLACK }]}>from me</Text>
            </View>
        </TouchableOpacity>
    );
};

export default MapButton;
