import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCryptoDetails } from '../redux/cryptoSlice';

const formatPrice = (price) => {
  if (typeof price === 'number') {
    return price.toFixed(2);
  }
  return parseFloat(price).toFixed(2);
};

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
      <p>
        Symbol:
        {' '}
        {details ? details.symbol : 'Loading...'}
      </p>
      <p>
        Price (USD):
        {' '}
        {details ? formatPrice(details.priceUsd) : 'Loading...'}
      </p>
      <p>
        Rank:
        {' '}
        {details ? details.rank : 'Loading...'}
      </p>
      <p>
        Market Cap (USD):
        {' '}
        {details ? parseFloat(details.marketCapUsd).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'Loading...'}
      </p>
      <p>
        24hr Volume (USD):
        {' '}
        {details ? parseFloat(details.volumeUsd24Hr).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'Loading...'}
      </p>
    </div>
  );
};

export default CryptoDetails;
