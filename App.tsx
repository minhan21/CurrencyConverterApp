import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './src/styles/theme';
import { RateProvider } from './src/context/RateContext';
import ErrorBoundary from './src/components/ErrorBoundary';
import Navigation from './src/navigation/Navigation';

const App: React.FC = () => (
  <RateProvider>
    <ErrorBoundary>
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </ErrorBoundary>
  </RateProvider>
);

export default App;
