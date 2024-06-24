import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CurrencyConverter from '../components/CurrencyConverter';

jest.useFakeTimers();

test('converts currency correctly', async () => {
  const rates = { USD: 1, EUR: 0.85 };
  const { getByLabelText, getByText } = render(
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

  // Wait for the conversion to update
  await waitFor(() => {
    expect(getByText('100 USD = 85 EUR')).toBeTruthy();
  });
});
