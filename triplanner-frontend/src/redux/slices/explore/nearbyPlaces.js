import {createSlice} from "@reduxjs/toolkit";

const nearbyPlacesSlice = createSlice({
    name: 'nearbyPlaces',

    initialState:{
        filters: [],
        nearbyPlaces: [],
        place: null,
    },

    reducers:{
        setFilters: (state, action) => {
            state.filters =
                state.filters.includes(action.payload.replace(' ', '_').toLowerCase()) ?
                state.filters.filter(name => name !== action.payload.replace(' ', '_').toLowerCase()) :
                [...state.filters, action.payload.replace(' ', '_').toLowerCase()];
        },

        setNearbyPlaces: (state, action) => {
            state.nearbyPlaces = action.payload;
        },

        setPlace: (state, action) => {
            state.place = action.payload;
        }
    }
});

export const {
    setFilters,
    setNearbyPlaces,
    setPlace,
} = nearbyPlacesSlice.actions;

export const selectFilters = state => state.nearbyPlaces.filters;
export const selectNearByPlaces = state => state.nearbyPlaces.nearbyPlaces;
export const selectPlace = state => state.nearbyPlaces.place;

export default nearbyPlacesSlice.reducer;