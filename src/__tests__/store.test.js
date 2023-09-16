import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../redux/cryptoSlice';
import detailReducer from '../redux/detailSlice';

describe('Store', () => {
  it('should be created correctly', () => {
    const store = configureStore({
      reducer: {
        crypto: cryptoReducer,
        detail: detailReducer,
      },
    });

    // Test if the store is created with the correct reducers
    expect(store.getState().crypto).toBeDefined();
    expect(store.getState().detail).toBeDefined();
  });
});
