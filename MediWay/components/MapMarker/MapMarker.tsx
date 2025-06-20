import React, { forwardRef, Ref } from 'react';
import { MapMarker as RNMapMarker, MapMarkerProps } from 'react-native-maps';

export type CustomMapMarkerProps = MapMarkerProps & {
    address?: string;
};

const MapMarker = forwardRef((props: CustomMapMarkerProps, ref: Ref<RNMapMarker>) => {
    return <RNMapMarker ref={ref} {...props} />;
});

export default MapMarker;
