import React, { useCallback, useEffect, useState } from 'react';

import GeneralInfo from '../components/home/GeneralInfo';
import Table from '../components/home/Table';
import Pagination from '../components/home/Pagination';
import DescriptionMktCap from '../components/home/DescriptionMktCap';
import Loader from '../components/global/Loader';
import Modal from '../components/global/Modal';
import Error from '../components/global/Error';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coinsData, setCoinsData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(10);

  const fetchCoinsData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`
      );
      const data = await response.json();

      if (data) {
        const formattedCoinsData = data.map((item) => {
          const {
            id,
            name,
            symbol,
            image,
            current_price,
            price_change_percentage_1h_in_currency,
            price_change_percentage_24h_in_currency,
            price_change_percentage_7d_in_currency,
            total_volume,
            market_cap,
            market_cap_rank,
            sparkline_in_7d,
          } = item;

          return {
            id: id,
            name: name,
            symbol: symbol,
            image: image,
            currentPrice: current_price,
            change1h: price_change_percentage_1h_in_currency,
            change24h: price_change_percentage_24h_in_currency,
            change7d: price_change_percentage_7d_in_currency,
            volume24h: total_volume,
            marketCap: market_cap,
            marketCapRank: market_cap_rank,
            last7days: sparkline_in_7d?.price,
          };
        });

        const filteredData = formattedCoinsData?.filter((coin) =>
          coin.id.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setCoinsData(filteredData);
      } else {
        setCoinsData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log('There was an error', error);
      setLoading(false);
      setError(true);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchCoinsData();
  }, [fetchCoinsData]);

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <>
      <GeneralInfo />
      <Table
        coinsData={coinsData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        coinsPerPage={coinsPerPage}
        setCoinsPerPage={setCoinsPerPage}
      />
      <Pagination
        totalCoins={coinsData.length}
        currentPage={currentPage}
        coinsPerPage={coinsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <DescriptionMktCap />
      <Modal />
    </>
  );
};

export default Home;
