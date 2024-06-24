// src/__tests__/CurrencyConverter.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CurrencyConverter from '../components/CurrencyConverter';

test('converts currency correctly', async () => {
  const rates = { USD: 1, EUR: 0.85 };
  const { getByText, getByLabelText } = render(
    <CurrencyConverter rates={rates} />,
  );

  // Select base and target currencies
  const baseCurrencyPicker = getByLabelText('Select base currency');
  const targetCurrencyPicker = getByLabelText('Select target currency');

  fireEvent(baseCurrencyPicker, 'valueChange', 'USD');
  fireEvent(targetCurrencyPicker, 'valueChange', 'EUR');

  // Enter amount and check conversion
  const amountInput = getByLabelText('Amount');
  fireEvent.changeText(amountInput, '100');

  await waitFor(() => {
    expect(getByText('100 USD = 85.00 EUR')).toBeTruthy();
  });
});
