// src/components/ExchangeRatesWrapper.tsx
import React from 'react';
import ExchangeRates from '../components/ExchangeRates';

const baseCurrency = 'USD'; // or any default base currency you want to use

const ExchangeRatesWrapper: React.FC = () => {
  return <ExchangeRates baseCurrency={baseCurrency} />;
};

export default ExchangeRatesWrapper;
