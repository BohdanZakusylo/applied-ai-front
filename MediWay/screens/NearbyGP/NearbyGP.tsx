import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import styles from './styles';
import Map from '../../components/Map/Map';

const LOGO = require('../../assets/images/logo.png');

export default function NearbyGP() {


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />

            <View style={styles.contentWrapper}>
                <Text style={styles.title}>Nearby GPs</Text>

                <Map />
            </View>


        </ScrollView>
    );
}