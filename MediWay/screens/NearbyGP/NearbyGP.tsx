import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import styles from './styles';
import Map, { MapRef } from '../../components/Map/Map';
import MapButton from '../../components/MapButton/MapButton';
import { LatLng } from 'react-native-maps';
import { getCrudeDistanceBetween, getNearbyGPs } from '../../services/location/location';
import Geolocation, { GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';
import { GooglePlaceResponse, GooglePlaceResult } from '../../services/location/locationTypes';
import { CustomMapMarkerProps } from '../../components/MapMarker/MapMarker';
import { useTheme } from '../../contexts/ThemeContext';

const LOGO = require('../../assets/images/logo.png');

export default function NearbyGP() {
    const [location, setLocation] = useState<LatLng>();
    const [selectedMarker, setSelectedMarker] = useState<number>(-1);
    const [markers, setMarkers] = useState<CustomMapMarkerProps[]>([]);
    const map = useRef<MapRef>(null);
    const { colors } = useTheme();

    const onMarkerSelected = (index: number) => {
        map.current?.onMarkerSelected(index);
        setSelectedMarker(index);
    };

    const onPositionError = (error: GeolocationError) => {
        console.warn(error);
        setLocation(undefined);
    };

    useEffect(() => {
        const getCurrentPosition = () => {
            Geolocation.getCurrentPosition((position: GeolocationResponse) => setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }), onPositionError);
        };

        getCurrentPosition();
        if (location && markers.length < 1) {
            getNearbyGPs(location).then((response: GooglePlaceResponse) => {
                setMarkers(response.results.sort(
                    (a: GooglePlaceResult, b: GooglePlaceResult) =>
                        getCrudeDistanceBetween({ latitude: a.geometry.location.lat, longitude: a.geometry.location.lng }, location) -
                        getCrudeDistanceBetween({ latitude: b.geometry.location.lat, longitude: b.geometry.location.lng }, location)
                ).map((result: GooglePlaceResult) => ({
                    coordinate: { latitude: result.geometry.location.lat, longitude: result.geometry.location.lng },
                    title: result.name,
                    description: result.vicinity,
                    address: result.vicinity,
                })));
            });
        }
    }, [location, markers]);

    return (
        <View style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />

            <View style={styles.contentWrapper}>
                <Map markers={markers} ref={map} />

                <View style={styles.legend}>
                    <View style={[styles.currentLocationCircle, {
                        backgroundColor: colors.SECONDARY_LIGHT,
                        borderColor: colors.SECONDARY_DARK,
                    }]} />
                    <Text style={{ color: colors.BLACK }}>Current Location</Text>
                </View>

                <ScrollView style={styles.buttons} contentContainerStyle={styles.buttonsContainer}>
                    {markers.length > 0 ? markers.map((marker: CustomMapMarkerProps, index: number) =>
                        <MapButton
                            key={index}
                            address={marker.description || ''}
                            originalLocation={location}
                            location={marker.coordinate}
                            locationName={marker.title || ''}
                            selected={selectedMarker === index}
                            onPress={() => onMarkerSelected(index)}
                        />
                    ) : <Text style={{ color: colors.BLACK }}>No doctors found nearby...</Text>}
                </ScrollView>
            </View>


        </View>
    );
}
