import React from 'react';
import { useSelector } from 'react-redux';

const CryptoList = () => {
    // Use the useSelector hook to get the cryptoData from the Redux store
    const cryptoData = useSelector((state) => state.crypto.cryptoData.data); // Accessing `data` attribute
    const status = useSelector((state) => state.crypto.status);

    // Handle loading and error states
    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error fetching data.</p>;

    // Map through cryptoData to display each cryptocurrency's details
    return (
        <div>
            {cryptoData && cryptoData.length > 0 ? (  // Check if cryptoData exists and has length greater than 0
                cryptoData.map((crypto, index) => (
                    <div key={index}>
                        <h3>{crypto.name}</h3>
                        <p>Symbol: {crypto.symbol}</p>
                        <p>Price (USD): {parseFloat(crypto.quote.USD.price).toFixed(2)}</p>
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default CryptoList;
