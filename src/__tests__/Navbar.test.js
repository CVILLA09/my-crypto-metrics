import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchCryptoData } from '../redux/cryptoSlice';

// Initialize mock store
const mockStore = configureStore([]);
let store;

// Mocking useDispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

// Mocking actions
jest.mock('../redux/cryptoSlice', () => ({
  fetchCryptoData: jest.fn(),
}));

describe('<Navbar />', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    store = mockStore({});
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders navbar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('my crypto metrics')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('dispatches actions on click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('link'));

    // Update this line to expect 2 dispatch calls
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(fetchCryptoData).toHaveBeenCalled();
  });
});
