export type GooglePlaceResponse = {
    html_attributions: string[]
    results: GooglePlaceResult[]
    status: string
}

type GoogleLatLng = {
    lat: number;
    lng: number;
}

export type GooglePlaceResult = {
    business_status: string
    geometry: {
        location: GoogleLatLng
        viewport: {
            northeast: GoogleLatLng
            southwest: GoogleLatLng
        }
    }
    icon: string
    icon_background_color: string
    icon_mask_base_uri: string
    name: string
    opening_hours?: {
        open_now: boolean
    }
    photos?: GooglePlacePhoto[]
    place_id: string
    plus_code?: {
        compound_code: string
        global_code: string
    }
    rating?: number
    reference: string
    scope: string
    types: string[]
    user_ratings_total?: number
    vicinity: string
}

export type GooglePlacePhoto = {
    height: number
    html_attributions: string[]
    photo_reference: string
    width: number
}
