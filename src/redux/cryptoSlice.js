import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async () => {
    const response = await axios.get('https://api.coincap.io/v2/assets?limit=20');
    return response.data;
  },
);

export const fetchCryptoDetails = createAsyncThunk(
  'crypto/fetchCryptoDetails',
  async (assetId) => {
    const response = await axios.get(`https://api.coincap.io/v2/assets/${assetId}`);
    return response.data;
  },
);

export const filterCryptos = createAsyncThunk(
  'crypto/filterCryptos',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.coincap.io/v2/assets?search=${searchQuery}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchCryptoHistoricalData = createAsyncThunk(
  'crypto/fetchCryptoHistoricalData',
  async (assetId) => {
    const response = await axios.get(`https://api.coincap.io/v2/assets/${assetId}/history?interval=d1`);
    return response.data;
  },
);

const initialState = {
  cryptoData: [],
  selectedDetails: null,
  historicalData: [],
  status: 'idle',
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cryptoData = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCryptoDetails.fulfilled, (state, action) => {
        state.selectedDetails = action.payload;
      })
      .addCase(filterCryptos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterCryptos.fulfilled, (state, action) => {
        state.cryptoData = action.payload;
        state.status = 'succeeded';
      })
      .addCase(filterCryptos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCryptoHistoricalData.fulfilled, (state, action) => {
        state.historicalData = action.payload.data;
      });
  },
});

export default cryptoSlice.reducer;
