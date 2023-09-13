const CryptoList = () => {
    const cryptoData = useSelector((state) => state.crypto.cryptoData.data);  // Note the added .data here
    const status = useSelector((state) => state.crypto.status);
  
    console.log("Crypto Data:", cryptoData);  // Log the data
  
    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error fetching data.</p>;
  
    return (
      <div>
        {cryptoData && Array.isArray(cryptoData) ? (
          cryptoData.map((crypto, index) => (
            <div key={index}>
              <h3>{crypto.name}</h3>
              <p>Symbol: {crypto.symbol}</p>
              <p>Price (USD): {crypto.rateUsd ? parseFloat(crypto.rateUsd).toFixed(2) : 'N/A'}</p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    );
  };
  