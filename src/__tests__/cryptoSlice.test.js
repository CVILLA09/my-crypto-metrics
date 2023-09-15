import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import cryptoReducer, {
  fetchCryptoData,
  fetchCryptoDetails,
  filterCryptos,
  fetchCryptoHistoricalData,
} from '../redux/cryptoSlice';

const axios = require('axios');

jest.mock('axios');

describe('Crypto Slice', () => {
  let store;

  const initialState = {
    cryptoData: [],
    selectedDetails: null,
    historicalData: [],
    status: 'idle',
    error: null,
  };

  beforeEach(() => {
    store = configureStore({ reducer: { crypto: cryptoReducer } });
  });

  it('should handle initial state', () => {
    expect(cryptoReducer(undefined, {})).toEqual(initialState);
  });

  describe('fetchCryptoData Async Thunk', () => {
    it('handles pending, fulfilled and rejected', async () => {
      const mockData = { data: 'some-mock-data' };
      const mockError = { message: 'some-mock-error' };

      act(() => {
        store.dispatch(fetchCryptoData());
      });
      let state = store.getState();
      expect(state.crypto.status).toBe('loading');

      axios.get.mockResolvedValueOnce(mockData);
      await act(async () => {
        await store.dispatch(fetchCryptoData());
      });
      state = store.getState();
      expect(state.crypto.status).toBe('succeeded');
      expect(state.crypto.cryptoData).toEqual(mockData.data);

      axios.get.mockRejectedValueOnce(mockError);
      await act(async () => {
        await store.dispatch(fetchCryptoData());
      });
      state = store.getState();
      expect(state.crypto.status).toBe('failed');
      expect(state.crypto.error).toEqual(mockError.message);
    });
  });

  describe('fetchCryptoDetails Async Thunk', () => {
    it('handles fulfilled state', async () => {
      const mockData = { data: 'some-details-data' };
      axios.get.mockResolvedValueOnce({ data: mockData });

      await act(async () => {
        await store.dispatch(fetchCryptoDetails('some-asset-id'));
      });

      const state = store.getState();
      expect(state.crypto.selectedDetails).toEqual(mockData);
    });
  });

  describe('filterCryptos Async Thunk', () => {
    it('handles pending, fulfilled and rejected', async () => {
      const mockData = { data: 'some-filtered-data' };
      const mockError = { response: { data: 'some-mock-error' } };

      axios.get.mockRejectedValueOnce(mockError);

      await act(async () => {
        await store.dispatch(filterCryptos('query'));
      });
      const state = store.getState();
      expect(state.crypto.error).toEqual(mockError.response.data);
    });
  });

  describe('fetchCryptoHistoricalData Async Thunk', () => {
    it('handles fulfilled state', async () => {
      const mockData = { data: 'some-historical-data' };
      axios.get.mockResolvedValueOnce({ data: mockData });

      await act(async () => {
        await store.dispatch(fetchCryptoHistoricalData('some-asset-id'));
      });

      const state = store.getState();
      expect(state.crypto.historicalData).toEqual(mockData.data);
    });
  });
});
