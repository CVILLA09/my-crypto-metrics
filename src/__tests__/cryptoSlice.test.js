process.env.NODE_ENV = 'test';

import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import cryptoReducer, { fetchCryptoData } from '../redux/cryptoSlice';

// Mocking axios
jest.mock('axios');

describe('Crypto Slice', () => {
  let store;
  
  // Define the initial state
  const initialState = {
    cryptoData: [],
    selectedDetails: null,
    historicalData: [],
    status: 'idle',
    error: null,
  };

  beforeEach(() => {
    // Configure the store before each test
    store = configureStore({ reducer: { crypto: cryptoReducer } });
  });

  // Test case to check if the initial state is handled correctly
  it('should handle initial state', () => {
    expect(cryptoReducer(undefined, {})).toEqual(initialState);
  });

  // Nested describe block for testing fetchCryptoData async thunk action
  describe('fetchCryptoData Async Thunk', () => {
    
    // Test case to check if the action handles pending, fulfilled, and rejected states
    it('handles pending, fulfilled and rejected', async () => {
      const mockData = { data: 'some-mock-data' };
      const mockError = { message: 'some-mock-error' };
      
      // Test for pending state
      act(() => {
        store.dispatch(fetchCryptoData());
      });
      let state = store.getState();
      expect(state.crypto.status).toBe('loading');
      
      // Test for fulfilled state
      axios.get.mockResolvedValueOnce(mockData);
      await act(async () => {
        await store.dispatch(fetchCryptoData());
      });
      state = store.getState();
      expect(state.crypto.status).toBe('succeeded');
      expect(state.crypto.cryptoData).toEqual(mockData);
      
      // Test for rejected state
      axios.get.mockRejectedValueOnce(mockError);
      await act(async () => {
        await store.dispatch(fetchCryptoData());
      });
      state = store.getState();
      expect(state.crypto.status).toBe('failed');
      expect(state.crypto.error).toEqual(mockError.message);
    });
  });

  // TODO: Write tests for other async actions
  // TODO: Write tests for state management
});
