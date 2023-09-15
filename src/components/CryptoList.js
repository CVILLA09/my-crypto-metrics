import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterCryptos } from '../redux/cryptoSlice';
import './CryptoList.css';

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

  console.log(cryptoData);

  return (
    <div>
      <div className="searchContainer">
        <input
          className="searchBar"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Curious about crypto? Type a name and let's dive in!"
        />
        <button className="searchBtn" type="button" onClick={handleSearch}>
          <i className="fa fa-search" />
        </button>
      </div>
      <div className="coinsList">
        {cryptoData && Array.isArray(cryptoData) ? (
          cryptoData.map((crypto, index) => (
            <div
              key={crypto.id}
              className="coinCard"
              style={{
                backgroundColor: ((Math.floor(index / 2) + index) % 2 === 0) ? '#4369B2' : '#3B5D9F',
              }}
            >
              <Link to={`/details/${crypto.id}`} className="no-underline">
                <h1>{crypto.symbol}</h1>
              </Link>
              <h2>
                {crypto.name}
              </h2>
              <h3>
                $
                {typeof crypto.priceUsd === 'number'
                  ? crypto.priceUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : parseFloat(crypto.priceUsd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default CryptoList;
