import { useState, useEffect } from 'react';

const useCurrencyInfo = (baseCurrency) => {
  const [currencyInfo, setCurrencyInfo] = useState({});

  useEffect(() => {
    async function fetchCurrencyInfo(){
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const data = await response.json();
        setCurrencyInfo(data.rates);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchCurrencyInfo();
  }, [baseCurrency]);

  return currencyInfo;
};

export default useCurrencyInfo;
