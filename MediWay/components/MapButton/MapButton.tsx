import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import styles from './styles';
import { BASE_HIT_SLOP } from '../../assets/constants';
import { LatLng } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { getDistanceBetween } from '../../services/location/location';

export type MapButtonProps = TouchableOpacityProps & {
    locationName: string;
    address: string;
    originalLocation?: LatLng;
    location: LatLng;
    selected: boolean;
}

const MapButton = (props: MapButtonProps) => {
    const [distance, setDistance] = useState<string>('');

    useEffect(() => {
        if (props.originalLocation) {
            getDistanceBetween(props.originalLocation, props.location).then((res) => setDistance(res.rows[0].elements[0].distance.text));
        }
    }, [props.location, props.originalLocation]);

    return (
        <TouchableOpacity hitSlop={BASE_HIT_SLOP} style={props.selected ? [styles.button, styles.buttonSelected] : styles.button} {...props}>
            <Image style={styles.icon} source={require('../../assets/images/map/gp-icon.png')} />

            <View style={styles.descriptionRegion}>
                <Text numberOfLines={1} style={styles.name}>{props.locationName}</Text>
                <Text numberOfLines={1} style={styles.address}>{props.address}</Text>
            </View>

            <View style={styles.distanceRegion}>
                <Text numberOfLines={1} style={styles.distance}>{distance}</Text>
                <Text numberOfLines={1} style={styles.fromMe}>from me</Text>
            </View>
        </TouchableOpacity>
    );
};

export default MapButton;
