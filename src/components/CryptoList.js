import React from 'react';
import { useSelector } from 'react-redux';

const CryptoList = () => {
  const cryptoData = useSelector((state) => state.crypto.cryptoData.data);
  const status = useSelector((state) => state.crypto.status);

  console.log("Crypto Data:", cryptoData);  // Log the data for debugging

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error fetching data.</p>;

  return (
    <div>
      {cryptoData && Array.isArray(cryptoData) ? (
        cryptoData.map((crypto, index) => (
          <div key={index}>
            <h3>{crypto.name}</h3>
            <p>Symbol: {crypto.symbol}</p>
            <p>Price (USD): {typeof crypto.priceUsd === 'number' ? crypto.priceUsd.toFixed(2) : parseFloat(crypto.priceUsd).toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default CryptoList;
