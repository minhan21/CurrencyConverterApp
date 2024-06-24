// src/components/ExchangeRates.tsx
import React, { useEffect, memo } from 'react';
import { View, StyleSheet, FlatList, ImageBackground } from 'react-native';
import {
  useTheme,
  Text,
  ActivityIndicator,
  Card,
  Button,
  Avatar,
} from 'react-native-paper';
import useFetchRates from '../hooks/useFetchRates';
import { useRateContext } from '../context/RateContext';

interface ExchangeRatesProps {
  baseCurrency: string;
}

const ExchangeRates: React.FC<ExchangeRatesProps> = ({ baseCurrency }) => {
  const { rates, loading, error, refetch } = useFetchRates(baseCurrency);
  const { setRates } = useRateContext();
  const { colors } = useTheme();

  useEffect(() => {
    setRates(rates);
  }, [rates, setRates]);

  const renderItem = ({ item }: { item: [string, number] }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Avatar.Text size={40} label={item[0][0]} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.currency}>{item[0]}</Text>
          <Text style={styles.rate}>{item[1]}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          color={colors.primary}
          accessibilityLabel="Loading exchange rates"
        />
        <Text>Loading exchange rates...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text
          style={{ color: colors.error, marginBottom: 10 }}
          accessibilityLabel="Error fetching exchange rates"
        >
          {error}
        </Text>
        <Button
          icon="refresh"
          mode="contained"
          onPress={refetch}
          style={styles.refreshButton}
        >
          Try Again
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <View
        style={styles.container}
        accessible
        accessibilityLabel="Exchange rates"
      >
        <Button
          icon="refresh"
          mode="contained"
          onPress={refetch}
          style={styles.refreshButton}
          labelStyle={styles.refreshButtonText}
        >
          Refresh Rates
        </Button>
        <FlatList
          data={Object.entries(rates)}
          renderItem={renderItem}
          keyExtractor={(item) => item[0]}
          refreshing={loading}
          onRefresh={refetch}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  refreshButton: {
    marginBottom: 10,
    backgroundColor: '#6200ee',
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 100,
  },
  card: {
    marginVertical: 5,
    borderRadius: 10,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#6200ee',
  },
  textContainer: {
    marginLeft: 15,
  },
  currency: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  rate: {
    fontSize: 16,
    color: '#555',
  },
});

export default memo(ExchangeRates);
