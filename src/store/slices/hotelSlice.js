import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    updateHotelName(state, { payload }) {
      return { ...state, hotelName: payload };
    },
    updateHotelLocation(state, { payload }) {
      return { ...state, hotelLocation: payload };
    },
    updateHotelDistance(state, { payload }) {
      return { ...state, hotelDistance: payload };
    },
    updateHotelBrand(state, { payload }) {
      return { ...state, hotelBrand: payload };
    },

    updateHotelDistanceList(state, { payload }) {
      return { ...state, distanceList: payload };
    },
    updateHotelBrandList(state, { payload }) {
      return { ...state, brandList: payload };
    },
  },
});
export const {
  updateHotelName,
  updateHotelLocation,
  updateHotelDistance,
  updateHotelBrand,
  updateHotelDistanceList,
  updateHotelBrandList,
} = hotelSlice.actions;

export const hotelSelector = (state) => state.hotelSlice;

export function fetchDistance() {
  return async (dispatch) => {
    try {
      let eventData = await fetch(`https://distance.free.beeceptor.com/`);
      const { data } = await eventData.json();
      dispatch(updateHotelDistanceList(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchBrands() {
  return async (dispatch) => {
    try {
      let eventData = await fetch(`https://brands.free.beeceptor.com/`);
      const { data } = await eventData.json();
      dispatch(updateHotelBrandList(data));
    } catch (error) {
      console.log(error);
    }
  };
}
export default hotelSlice.reducer;
