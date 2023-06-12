import React, { createContext, useCallback, useEffect, useState } from 'react';

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [globalData, setGlobalData] = useState(null);

  const fetchGlobalData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/global`);
      const data = await response.json();

      const { data: globalInfo } = data;

      if (globalInfo) {
        const {
          active_cryptocurrencies,
          markets,
          total_market_cap,
          total_volume,
          market_cap_percentage,
          market_cap_change_percentage_24h_usd,
        } = globalInfo;
        const formattedGlobalData = {
          totalCoins: active_cryptocurrencies,
          totalExchanges: markets,
          totalMktCap: Math.round(total_market_cap?.usd),
          totalMktCapChange: market_cap_change_percentage_24h_usd.toFixed(1),
          totalVolume: Math.round(total_volume?.usd),
          btcDomination: market_cap_percentage?.btc.toFixed(1),
          ethDomination: market_cap_percentage?.eth.toFixed(1),
        };
        setGlobalData(formattedGlobalData);
      } else {
        setGlobalData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log('There was an error', error);
      setLoading(false);
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchGlobalData();
  }, [fetchGlobalData]);

  const value = {
    loading,
    error,
    globalData,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
