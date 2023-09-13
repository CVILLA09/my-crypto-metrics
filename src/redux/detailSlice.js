import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDetails: null,
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setSelectedDetails: (state, action) => {
      state.selectedDetails = action.payload;
    },
    clearSelectedDetails: (state) => {
      state.selectedDetails = null;
    },
  },
});

export const { setSelectedDetails, clearSelectedDetails } = detailSlice.actions;

export default detailSlice.reducer;
