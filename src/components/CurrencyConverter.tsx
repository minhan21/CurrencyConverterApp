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
      }
    },
    [baseCurrency, targetCurrency, rates],
  );

  return (
    <View style={commonStyles.container}>
      <RNPickerSelect
        onValueChange={(value) => setBaseCurrency(value)}
        items={currencyItems}
        placeholder={{ label: 'Select base currency', value: null }}
        style={pickerSelectStyles()}
      />
      <RNPickerSelect
        onValueChange={(value) => setTargetCurrency(value)}
        items={currencyItems}
        placeholder={{ label: 'Select target currency', value: null }}
        style={pickerSelectStyles()}
      />
      <TextInput
        mode="outlined"
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

// Custom PropTypes validator for the rates prop
const ratesPropType = (props: any, propName: string, componentName: string) => {
  const prop = props[propName];
  if (typeof prop !== 'object' || prop === null) {
    return new Error(`${propName} in ${componentName} is not an object`);
  }

  for (const key in prop) {
    if (typeof prop[key] !== 'number') {
      return new Error(
        `Invalid prop ${propName} in ${componentName}: key "${key}" must be a number`,
      );
    }
  }
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
