import React from 'react';
import {
  render, screen, waitFor, cleanup,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CryptoDetails from '../components/CryptoDetails';
import { fetchCryptoDetails, fetchCryptoHistoricalData } from '../redux/cryptoSlice';

jest.mock('../redux/cryptoSlice');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<CryptoDetails />', () => {
  let store;

  beforeEach(() => {
    const initialState = {
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
    store = mockStore(initialState);

    fetchCryptoDetails.mockResolvedValue({ type: 'some-type', payload: {} });
    fetchCryptoHistoricalData.mockResolvedValue({ type: 'some-type', payload: {} });

    jest.spyOn(store, 'dispatch');
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it('dispatches fetchCryptoDetails and fetchCryptoHistoricalData on mount', async () => {
    render(
      <Provider store={store}>
        <CryptoDetails />
      </Provider>,
    );

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(2);

      const expectedDetailsType = { type: fetchCryptoDetails.fulfilled.type };
      const expectedDetails = expect.objectContaining(expectedDetailsType);
      expect(store.dispatch).toHaveBeenCalledWith(expectedDetails);

      const expectedHistoricalType = { type: fetchCryptoHistoricalData.fulfilled.type };
      const expectedHistorical = expect.objectContaining(expectedHistoricalType);
      expect(store.dispatch).toHaveBeenCalledWith(expectedHistorical);
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

  it('handles fetchCryptoDetails failure', async () => {
    fetchCryptoDetails.mockRejectedValue(new Error('An error occurred'));

    render(
      <Provider store={store}>
        <CryptoDetails />
      </Provider>,
    );

    await waitFor(() => {
      // Assuming you display an error message in your component
      expect(screen.getByText('An error occurred')).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <CryptoDetails />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
