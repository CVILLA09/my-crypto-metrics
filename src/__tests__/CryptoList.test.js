import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

  // User interactions tests
  describe('CryptoList Component - User Interactions', () => {
    it('simulates search button click', () => {
      const mockDispatch = jest.fn();
      const initialState = {
        crypto: {
          cryptoData: [],
          status: 'idle',
          error: null,
        },
        detail: {},
      };
      const store = mockStore(initialState);
      store.dispatch = mockDispatch;

      render(
        <Provider store={store}>
          <Router>
            <CryptoList />
          </Router>
        </Provider>,
      );

      fireEvent.click(screen.getByRole('button')); // Replace 'button' with a specific identifier if needed
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  // Navigation tests
  describe('CryptoList Component - Navigation', () => {
    it('navigates to details page on clicking a crypto', async () => {
      const mockCryptoData = [{
        id: '1', symbol: 'BTC', name: 'Bitcoin', priceUsd: '45000',
      }];

      const initialState = {
        crypto: {
          cryptoData: { data: mockCryptoData },
          status: 'succeeded',
          error: null,
        },
        detail: {},
      };

      const store = mockStore(initialState);

      // Explicitly re-render the component with the new state
      render(
        <Provider store={store}>
          <Router initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<CryptoList />} />
              <Route path="/details/:id" element={<div>Mock Details Component</div>} />
            </Routes>
          </Router>
        </Provider>,
      );

      // Use waitFor to wait for the element to be in the document
      await waitFor(() => expect(screen.getByText('BTC')).toBeInTheDocument());

      fireEvent.click(screen.getByText('BTC'));

      expect(screen.getByText('Mock Details Component')).toBeInTheDocument();
    });
  });
});
