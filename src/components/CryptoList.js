import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterCryptos } from '../redux/cryptoSlice';

const CryptoList = () => {
  const dispatch = useDispatch();
  const cryptoData = useSelector((state) => state.crypto.cryptoData.data);
  const status = useSelector((state) => state.crypto.status);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    dispatch(filterCryptos(searchQuery));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error fetching data.</p>;

  return (
    <div>
      <div className="searchContainer">
        <h2>Search Crypto Here</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by name"
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {cryptoData && Array.isArray(cryptoData) ? (
        cryptoData.map((crypto) => (
          <div key={crypto.id}>
            <Link to={`/details/${crypto.id}`}>
              <h3>{crypto.name}</h3>
            </Link>
            <p>
              Symbol:
              {crypto.symbol}
            </p>
            <p>
              Price (USD):
              {typeof crypto.priceUsd === 'number' ? crypto.priceUsd.toFixed(2) : parseFloat(crypto.priceUsd).toFixed(2)}
            </p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default CryptoList;
