import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import cryptoReducer from './cryptoSlice';
import detailReducer from './detailSlice';

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    detail: detailReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
