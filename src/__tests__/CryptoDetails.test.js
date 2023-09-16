import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CryptoDetails from '../components/CryptoDetails';
import { fetchCryptoDetails, fetchCryptoHistoricalData } from '../redux/cryptoSlice';

const mockStore = configureStore([]);
jest.mock('../redux/cryptoSlice');

describe('<CryptoDetails />', () => {
  let store;
  const mockState = {
    crypto: {
      selectedDetails: {
        name: 'Bitcoin',
        symbol: 'BTC',
        rank: 1,
        priceUsd: '40000',
        marketCapUsd: '80000000',
        volumeUsd24Hr: '2000000',
      },
      historicalData: [],
    },
  };

  beforeEach(() => {
    store = mockStore(mockState);
    fetchCryptoDetails.mockReturnValue({ type: 'crypto/fetchCryptoDetails/fulfilled', payload: {} });
    fetchCryptoHistoricalData.mockReturnValue({ type: 'crypto/fetchCryptoHistoricalData/fulfilled', payload: {} });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('dispatches fetchCryptoDetails and fetchCryptoHistoricalData on mount', async () => {
    const dispatchedActions = [];
    store.dispatch = jest.fn((action) => dispatchedActions.push(action));

    render(
      <Provider store={store}>
        <CryptoDetails />
      </Provider>,
    );

    await waitFor(() => {
      expect(dispatchedActions).toContainEqual(expect.objectContaining({ type: 'crypto/fetchCryptoDetails/fulfilled' }));
      expect(dispatchedActions).toContainEqual(expect.objectContaining({ type: 'crypto/fetchCryptoHistoricalData/fulfilled' }));
    });
  });

  it('renders crypto details correctly', async () => {
    render(
      <Provider store={store}>
        <CryptoDetails />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Name:')).toBeInTheDocument();
      expect(screen.getByText('Symbol:')).toBeInTheDocument();
      expect(screen.getByText('BTC')).toBeInTheDocument();
      expect(screen.getByText('Price (USD):')).toBeInTheDocument();
      expect(screen.getByText('$40,000.00')).toBeInTheDocument();
      expect(screen.getByText('Rank:')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('Market Cap (USD):')).toBeInTheDocument();
      expect(screen.getByText('$80,000,000.00')).toBeInTheDocument();
      expect(screen.getByText('24hr Volume (USD):')).toBeInTheDocument();
      expect(screen.getByText('$2,000,000.00')).toBeInTheDocument();
    });
  });
});
