import detailReducer, { setSelectedDetails, clearSelectedDetails } from '../redux/detailSlice';

describe('Detail Slice', () => {
  let state;

  // Define the initial state
  const initialState = {
    selectedDetails: null,
  };

  beforeEach(() => {
    // Reset the state before each test
    state = initialState;
  });

  // Test case to check if the initial state is handled correctly
  it('should handle initial state', () => {
    expect(detailReducer(undefined, {})).toEqual(initialState);
  });

  // Test case for setSelectedDetails action
  it('should set selected details', () => {
    const mockDetails = { id: 1, name: 'Bitcoin' };
    const nextState = detailReducer(state, setSelectedDetails(mockDetails));
    expect(nextState.selectedDetails).toEqual(mockDetails);
  });

  // Test case for clearSelectedDetails action
  it('should clear selected details', () => {
    const mockDetails = { id: 1, name: 'Bitcoin' };
    state = { selectedDetails: mockDetails }; // setting initial state to have some details
    const nextState = detailReducer(state, clearSelectedDetails());
    expect(nextState.selectedDetails).toBeNull();
  });
});
