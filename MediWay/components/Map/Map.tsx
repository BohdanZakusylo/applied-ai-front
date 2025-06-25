import { Linking, Text, View } from 'react-native';
import styles from './styles';
import Geolocation, { GeolocationResponse, GeolocationError } from '@react-native-community/geolocation';
import { useState, useEffect, useRef, Ref, forwardRef, useImperativeHandle } from 'react';
import Button from '../Button/Button';
import MapView, { Circle, Details, Region, LatLng, MapMarker as RNMapMarker } from 'react-native-maps';
import MapMarker, { CustomMapMarkerProps } from '../MapMarker/MapMarker';
import { useTheme } from '../../contexts/ThemeContext';

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
    const { isDarkMode, colors } = useTheme();

    const mapViewRef = useRef<MapView>(null);
    const markerRefs = useRef<(RNMapMarker | null)[]>([]);

    useImperativeHandle(ref, () => ({
        onMarkerSelected(index: number) {
            markerRefs.current[index]?.showCallout();
            mapViewRef.current?.animateCamera({ center: markers![index].coordinate });
        },
    }));

    const onRegionChanged = (region: Region, _details: Details) => {
        setZoom(region.latitudeDelta);
    };

    const onPositionError = (error: GeolocationError) => {
        console.warn(error);
        if (error.PERMISSION_DENIED === 1) {
            setCanRequest(false);
        }
        setLocation(undefined);
    };

    const requestGeoPermission = () => {
        Geolocation.requestAuthorization(() => { }, onPositionError);
    };

    useEffect(() => {
        const getCurrentPosition = () => {
            Geolocation.getCurrentPosition((position: GeolocationResponse) => setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }), onPositionError);
        };

        if (!locationOverride) {
            getCurrentPosition();
        }
    }, [locationOverride]);

    if (!location) {
        return (
            <View style={[styles.noPermissionWrapper, { backgroundColor: colors.BACKGROUND }]}>
                <Text style={[styles.noPermissionText, { color: colors.BLACK }]}>No permission granted</Text>
                {canRequest
                    ? <Button label="Request Permission" onPress={requestGeoPermission} />
                    : <Button label="Go to Settings" onPress={Linking.openSettings} />}
            </View>
        );
    }

    return (
        <View style={[styles.mapWrapper, { borderColor: colors.LIGHT_GRAY }]}>
            <MapView
                userInterfaceStyle={isDarkMode ? 'dark' : 'light'}
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: zoom,
                    longitudeDelta: zoom * 0.5,
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
                <Circle
                    strokeColor={colors.SECONDARY_DARK.toString()}
                    strokeWidth={4}
                    center={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    radius={2000 * zoom}
                    fillColor={colors.SECONDARY_LIGHT.toString()}
                />
            </MapView>
        </View>
    );
});

export default Map;
