// src/Navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import CurrencyConverterWrapper from '../screens/CurrencyConverterWrapper';
import ExchangeRatesWrapper from '../screens/ExchangeRatesWrapper';

const Tab = createBottomTabNavigator();

const Navigation: React.FC = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="CurrencyConverter"
        screenOptions={({ route }): BottomTabNavigationOptions => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string = '';

            if (route.name === 'CurrencyConverter') {
              iconName = 'calculator';
            } else if (route.name === 'ExchangeRates') {
              iconName = 'currency-usd';
            }

            return <Icon name={iconName} color={color} size={size} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="CurrencyConverter"
          component={CurrencyConverterWrapper}
        />
        <Tab.Screen name="ExchangeRates" component={ExchangeRatesWrapper} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
