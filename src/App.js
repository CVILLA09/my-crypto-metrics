import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData } from './redux/cryptoSlice';
import CryptoList from './components/CryptoList';  // <-- Import the CryptoList component

function App() {
  const dispatch = useDispatch();
  
  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  // Get status from Redux store
  const status = useSelector((state) => state.crypto.status);

  // Handle loading and error states
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error fetching data.</p>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptoList />} />  {/* <-- Use CryptoList as the homepage */}
        <Route path="/details/:id" element={<div>Detail Page Placeholder</div>} />
      </Routes>
    </Router>
  );
}

export default App;
