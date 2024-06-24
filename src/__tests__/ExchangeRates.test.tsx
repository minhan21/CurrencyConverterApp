// src/__tests__/ExchangeRates.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ExchangeRates from '../components/ExchangeRates';
import { RateProvider } from '../context/RateContext';

test('renders exchange rates', async () => {
  const { getByText } = render(
    <RateProvider>
      <ExchangeRates baseCurrency="USD" />
    </RateProvider>,
  );
  await waitFor(() => expect(getByText('USD')).toBeTruthy());
  await waitFor(() => expect(getByText('1')).toBeTruthy());
});

test('displays error message on error', async () => {
  jest.mock('../hooks/useFetchRates', () => ({
    __esModule: true,
    default: jest.fn(() => ({
      rates: {},
      loading: false,
      error: 'Failed to fetch exchange rates',
      refetch: jest.fn(),
    })),
  }));
});
