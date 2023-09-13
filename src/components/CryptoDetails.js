import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCryptoDetails } from '../redux/cryptoSlice';

const CryptoDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const details = useSelector((state) => state.crypto.selectedDetails);

  useEffect(() => {
    dispatch(fetchCryptoDetails(id));
  }, [dispatch, id]);

  return (
    <div className="cryptoDetail">
      <h2>Crypto Detail</h2>
      <h3>{details ? details.name : 'Loading...'}</h3>
      <p>Symbol: {details ? details.symbol : 'Loading...'}</p>
      <p>
        Price (USD):
        {details ? (typeof details.priceUsd === 'number' ? details.priceUsd.toFixed(2) : parseFloat(details.priceUsd).toFixed(2)) : 'Loading...'}
      </p>
      <p>Rank: {details ? details.rank : 'Loading...'}</p>
      <p>Market Cap (USD): {details ? parseFloat(details.marketCapUsd).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'Loading...'}</p>
      <p>24hr Volume (USD): {details ? parseFloat(details.volumeUsd24Hr).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'Loading...'}</p>
    </div>
  );
};

export default CryptoDetails;
