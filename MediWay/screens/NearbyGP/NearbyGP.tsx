import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import styles from './styles';
import Map, { MapRef } from '../../components/Map/Map';
import MapButton from '../../components/MapButton/MapButton';
import { LatLng, MapMarkerProps } from 'react-native-maps';
import { getDistanceBetween, getNearbyGPs } from '../../services/location/location';
import Geolocation, { GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';
import { GooglePlaceResponse, GooglePlaceResult } from '../../services/location/locationTypes';
import { CustomMapMarkerProps } from '../../components/MapMarker/MapMarker';

const LOGO = require('../../assets/images/logo.png');

export default function NearbyGP() {
    const [location, setLocation] = useState<LatLng>();
    const [selectedMarker, setSelectedMarker] = useState<number>(-1);
    const [markers, setMarkers] = useState<CustomMapMarkerProps[]>([]);
    const map = useRef<MapRef>(null);

    const onMarkerSelected = (index: number) => {
        map.current?.onMarkerSelected(index);
        setSelectedMarker(index);
    }

    const onPositionError = (error: GeolocationError) => {
        console.warn(error);
        setLocation(undefined);
    };

    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition((position: GeolocationResponse) => setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }), onPositionError);
    }

    useEffect(() => {
        getCurrentPosition();
        if (location && markers.length < 1) {
            getNearbyGPs(location).then((response: GooglePlaceResponse) => {
                setMarkers(response.results.map((result: GooglePlaceResult) => ({
                    coordinate: { latitude: result.geometry.location.lat, longitude: result.geometry.location.lng },
                    title: result.name,
                    description: result.vicinity,
                    address: result.vicinity,
                })));
            })
        }
    }, [markers]);

    return (
        <View style={styles.container}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />

            <View style={styles.contentWrapper}>
                <Map markers={markers} ref={map} />

                <View style={styles.legend}>
                    <View style={styles.currentLocationCircle} />
                    <Text>Current Location</Text>
                </View>

                <ScrollView style={styles.buttons} contentContainerStyle={styles.buttonsContainer}>
                    {markers.map((marker: CustomMapMarkerProps, index: number) =>
                        <MapButton
                            key={index}
                            address={marker.description || ''}
                            originalLocation={location}
                            location={marker.coordinate}
                            locationName={marker.title || ''}
                            selected={selectedMarker === index}
                            onPress={() => onMarkerSelected(index)}
                        />
                    )}
                </ScrollView>
            </View>


        </View>
    );
}