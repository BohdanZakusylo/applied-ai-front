import { Text, View } from 'react-native';
import styles from './styles';
import { BASE_HIT_SLOP } from '../../assets/constants';
import Geolocation, { GeolocationResponse, GeolocationError } from '@react-native-community/geolocation';
import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import MapView from 'react-native-maps';

export type MapProps = {

};

const Map = (props: MapProps) => {
    const [location, setLocation] = useState<GeolocationResponse>();
    const [canRequest, setCanRequest] = useState<boolean>(true);

    const onPositionError = (error: GeolocationError) => {
        console.warn(error);
        if (error.PERMISSION_DENIED == 1) {
            setCanRequest(false);
        }
        setLocation(undefined);
    };

    const requestGeoPermission = () => {
        Geolocation.requestAuthorization(() => {}, onPositionError);
    }

    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(setLocation, onPositionError);
    }

    useEffect(() => {
        getCurrentPosition();
    }, []);

    if (!location) {
        return (
            <View>
                <Text>No permission granted</Text>
                {canRequest && <Button label='Request Permission' buttonProps={ { onPress: requestGeoPermission } } />}
            </View>
        )
    }

    return (
        <View>
            <Text>{location.coords.longitude} long {location.coords.latitude} lat</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
};

export default Map;
