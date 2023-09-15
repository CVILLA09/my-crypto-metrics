import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import CryptoList from '../components/CryptoList';
import '@testing-library/jest-dom';

const mockStore = configureMockStore([thunk]);

describe('CryptoList Component', () => {
  it('renders loading state', () => {
    const initialState = {
      crypto: {
        cryptoData: [],
        status: 'loading',
        error: null,
      },
      detail: {},
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <CryptoList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders failed state', () => {
    const initialState = {
      crypto: {
        cryptoData: [],
        status: 'failed',
        error: null,
      },
      detail: {},
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <CryptoList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Error fetching data.')).toBeInTheDocument();
  });

  it('renders succeeded state with crypto data', () => {
    const mockCryptoData = [
      {
        id: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        priceUsd: '50000',
      },
      {
        id: '2',
        symbol: 'ETH',
        name: 'Ethereum',
        priceUsd: '3000',
      },
    ];

    const initialState = {
      crypto: {
        cryptoData: { data: mockCryptoData },
        status: 'succeeded',
        error: null,
      },
      detail: {},
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <CryptoList />
        </Router>
      </Provider>,
    );

    // Validate if the crypto data is rendered correctly
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('$50,000.00')).toBeInTheDocument();

    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('$3,000.00')).toBeInTheDocument();
  });
});
