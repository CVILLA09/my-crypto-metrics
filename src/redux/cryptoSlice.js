import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
/* eslint-disable import/prefer-default-export */

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async () => {
    const API_KEY = '2a5b5dfc-d30c-4292-ab84-66794c11ce94';
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
      params: {
        start: 1,
        limit: 10,
        convert: 'USD',
      },
    });
    return response.data;
  },
);
