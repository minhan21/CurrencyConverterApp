// src/components/CurrencyConverter.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import commonStyles from '../styles/commonStyles';
import { roundToTwoDecimals } from '../utils';

interface CurrencyConverterProps {
  rates: Record<string, number>;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ rates }) => {
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string>('EUR');
  const [amount, setAmount] = useState<string>('1');
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);

  const currencyItems = useMemo(
    () =>
      Object.keys(rates).map((currency) => ({
        label: currency,
        value: currency,
      })),
    [rates],
  );

  const handleConvert = useCallback(
    (value: string) => {
      setAmount(value);
      if (rates[baseCurrency] && rates[targetCurrency]) {
        const result =
          (parseFloat(value) / rates[baseCurrency]) * rates[targetCurrency];
        setConvertedAmount(roundToTwoDecimals(result).toString());
      } else {
        setConvertedAmount(null); // Handle edge case if rates are not available
      }
    },
    [baseCurrency, targetCurrency, rates],
  );

  return (
    <View style={commonStyles.container}>
      <View accessible={true} accessibilityLabel="Select base currency">
        <RNPickerSelect
          onValueChange={(value) => setBaseCurrency(value)}
          items={currencyItems}
          placeholder={{ label: 'Select base currency', value: null }}
          style={pickerSelectStyles()}
        />
      </View>
      <View accessible={true} accessibilityLabel="Select target currency">
        <RNPickerSelect
          onValueChange={(value) => setTargetCurrency(value)}
          items={currencyItems}
          placeholder={{ label: 'Select target currency', value: null }}
          style={pickerSelectStyles()}
        />
      </View>
      <TextInput
        mode="outlined"
        accessibilityLabel="Amount"
        label="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={handleConvert}
        style={styles.input}
      />
      {convertedAmount && (
        <Text style={styles.resultText}>
          {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
        </Text>
      )}
    </View>
  );
};

const pickerSelectStyles = () => ({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginVertical: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginVertical: 10,
  },
});

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
  resultText: {
    fontSize: 18,
    marginVertical: 20,
  },
});

export default React.memo(CurrencyConverter);
