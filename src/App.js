import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData } from './redux/cryptoSlice';

function App() {
  const dispatch = useDispatch();
  
  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  // Get data from Redux store
  // const cryptoData = useSelector((state) => state.crypto.cryptoData);  // Commented out
  const status = useSelector((state) => state.crypto.status);

  // Handle loading and error states
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error fetching data.</p>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page Placeholder</div>} />
        <Route path="/details/:id" element={<div>Detail Page Placeholder</div>} />
      </Routes>
    </Router>
  );
}

export default App;
