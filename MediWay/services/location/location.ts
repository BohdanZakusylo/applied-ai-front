import { LatLng } from "react-native-maps"
import { GooglePlaceResponse } from "./locationTypes";
import { GOOGLE_MAPS_API_KEY } from "@env";
const ROUGH_KM_PER_DEGREE: number = 111;

export const getCrudeDistanceBetween = (a: LatLng, b: LatLng) => {
    const dx = (b.latitude - a.latitude) * ROUGH_KM_PER_DEGREE;
    const dy = (b.longitude - a.longitude) * ROUGH_KM_PER_DEGREE;
    return Math.sqrt(dx * dx + dy * dy);
}

export const getDistanceBetween = async (a: LatLng, b: LatLng) => {
    const params: Record<string, string> = {
        origins: `${a.latitude},${a.longitude}`,
        destinations: `${b.latitude},${b.longitude}`,
        units: 'metric',
        key: GOOGLE_MAPS_API_KEY,
    };

    return await locationFetch('https://maps.googleapis.com/maps/api/distancematrix/json', params);
};

export const getNearbyGPs = async (location: LatLng, radius: number = 5000, type: string = 'doctor', keyword: string = 'general+practitioner'): Promise<GooglePlaceResponse> => {
    const params: Record<string, string> = {
        location: `${location.latitude},${location.longitude}`,
        radius: `${radius}`,
        type,
        keyword,
        key: GOOGLE_MAPS_API_KEY,
    };

    return await locationFetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json', params);
}

export const locationFetch = async (url: string, params: Record<string, string>) => {
    const concatUrl = `${url}?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')}`;

    try {
        const response = await fetch(concatUrl);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};