// src/services/api.ts
import axios from 'axios';
import { API_BASE_URL } from '@env';

export const fetchRates = async (
  baseCurrency: string = 'USD',
): Promise<{ rates: Record<string, number> }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${baseCurrency}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch exchange rates');
  }
};
