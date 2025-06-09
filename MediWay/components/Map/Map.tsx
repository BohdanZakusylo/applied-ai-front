import { Alert, Linking, Text, View } from 'react-native';
import styles from './styles';
import { BASE_HIT_SLOP, COLORS } from '../../assets/constants';
import Geolocation, { GeolocationResponse, GeolocationError } from '@react-native-community/geolocation';
import { useState, useEffect, useRef, Ref, forwardRef, useImperativeHandle } from 'react';
import Button from '../Button/Button';
import MapView, { Circle, Details, Region, LatLng, MapMarkerProps, MapMarker as RNMapMarker } from 'react-native-maps';
import MapMarker, { CustomMapMarkerProps } from '../MapMarker/MapMarker';

export type MapProps = {
    locationOverride?: LatLng;
    markers?: CustomMapMarkerProps[];
};

export type MapRef = {
    onMarkerSelected: (index: number) => void;
};

const Map = forwardRef(({ locationOverride, markers }: MapProps, ref: Ref<MapRef>) => {
    const [location, setLocation] = useState<LatLng | undefined>(locationOverride);
    const [canRequest, setCanRequest] = useState<boolean>(true);
    const [zoom, setZoom] = useState<number>(0.09);

    const mapViewRef = useRef<MapView>(null);
    const markerRefs = useRef<(RNMapMarker | null)[]>([]);

    useImperativeHandle(ref, () => ({
        onMarkerSelected(index: number) {
            markerRefs.current[index]?.showCallout();
            mapViewRef.current?.animateCamera({ center: markers![index].coordinate })
        }
    }));

    const onRegionChanged = (region: Region, _details: Details) => {
        setZoom(region.latitudeDelta);
    };

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
        Geolocation.getCurrentPosition((position: GeolocationResponse) => setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude}), onPositionError);
    }

    useEffect(() => {
        if (!locationOverride) {
            getCurrentPosition();
        }
    }, []);

    if (!location) {
        return (
            <View>
                <Text>No permission granted</Text>
                {canRequest
                ? <Button label='Request Permission' buttonProps={ { onPress: requestGeoPermission } } />
                : <Button label='Go to Settings' buttonProps={ { onPress: Linking.openSettings } } />}
            </View>
        )
    }

    return (
        <View style={styles.mapWrapper}>
            <MapView
                userInterfaceStyle='light'
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: zoom,
                    longitudeDelta: zoom*0.5,
                }}
                onRegionChange={onRegionChanged}
                ref={mapViewRef}
            >
                {markers && markers.map(
                    (marker: CustomMapMarkerProps, index: number) => <MapMarker
                        key={index}
                        ref={(el: RNMapMarker & never) => (markerRefs.current[index] = el)}
                        {...marker}
                    />
                )}
                <Circle strokeColor={COLORS.SECONDARY_DARK as string} strokeWidth={4} center={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                }} radius={2000*zoom} fillColor={COLORS.SECONDARY_LIGHT as string} />
            </MapView>
        </View>
    );
});

export default Map;
