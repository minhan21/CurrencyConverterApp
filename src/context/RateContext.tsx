// src/context/RateContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RateContextProps {
  rates: Record<string, number>;
  setRates: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

const RateContext = createContext<RateContextProps | undefined>(undefined);

export const RateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rates, setRates] = useState<Record<string, number>>({});

  return (
    <RateContext.Provider value={{ rates, setRates }}>
      {children}
    </RateContext.Provider>
  );
};

export const useRateContext = () => {
  const context = useContext(RateContext);
  if (context === undefined) {
    throw new Error('useRateContext must be used within a RateProvider');
  }
  return context;
};
