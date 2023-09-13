import React from 'react';
import { useSelector } from 'react-redux';

const CryptoDetails = () => {
  const details = useSelector((state) => state.crypto.selectedDetails);

  return (
    <div className="cryptoDetail">
      <h2>Crypto Detail</h2>
      <h3>{details.name}</h3>
      <p>
        Symbol: {details.symbol}
      </p>
      <p>
        Price (USD): 
        {typeof details.rateUsd === 'number' ? details.rateUsd.toFixed(2) : parseFloat(details.rateUsd).toFixed(2)}
      </p>
      <p>
        Rank: {details.rank}
      </p>
      <p>
        Market Cap (USD): {details.marketCapUsd}
      </p>
      <p>
        24hr Volume (USD): {details.volumeUsd24Hr}
      </p>
    </div>
  );
};

export default CryptoDetails;
