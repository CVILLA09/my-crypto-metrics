import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  // More tests will follow
});
