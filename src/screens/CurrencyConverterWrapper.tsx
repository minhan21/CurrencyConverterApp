// src/components/CurrencyConverterWrapper.tsx
import React from 'react';
import CurrencyConverter from '../components/CurrencyConverter';

const rates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110,
  // Add more default rates if necessary
};

const CurrencyConverterWrapper: React.FC = () => {
  return <CurrencyConverter rates={rates} />;
};

export default CurrencyConverterWrapper;
