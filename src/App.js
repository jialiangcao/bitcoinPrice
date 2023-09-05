import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const date = new Date();
const formattedDate = date.toDateString();

function App() {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const apiKey = "C241E351-9261-4911-81EE-64E669AF8019";
  /* Insert coinapi key */

  useEffect(() => {
    async function fetchBitcoinPrice() {
      try {
        const response = await axios.get(`https://rest.coinapi.io/v1/exchangerate/BTC/USD?apikey=${apiKey}`);
        const { rate } = response.data;

        const formattedBitcoinPrice = new Intl.NumberFormat('en', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(rate);

        setBitcoinPrice(formattedBitcoinPrice);
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      }
    }

    fetchBitcoinPrice();
  }, [apiKey]);

  return (
  <div className="App">
        <h1>
          What is the price of bitcoin?
       </h1>
       {bitcoinPrice !== null ? (
          <h1>
            On {formattedDate}, the price of bitcoin is: ${bitcoinPrice}
         </h1>
        ) : (
          <p>Loading Bitcoin price...</p>
        )}
  </div>
  );
}

export default App;
