import axios from 'axios';

export const fetchRates = async (
  baseCurrency: string = 'USD',
): Promise<{ rates: Record<string, number> }> => {
  try {
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch exchange rates');
  }
};
