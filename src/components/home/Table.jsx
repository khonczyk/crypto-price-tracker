import React from 'react';

import Dropdown from './Dropdown';
import Searchbar from './Searchbar';
import TableRow from './TableRow';

const Table = (props) => {
  const {
    coinsData,
    searchTerm,
    setSearchTerm,
    currentPage,
    coinsPerPage,
    setCurrentPage,
    setCoinsPerPage,
  } = props;

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = coinsData.slice(indexOfFirstCoin, indexOfLastCoin);

  return (
    <div className="container">
      <div className="table__tools">
        <Searchbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCurrentPage={setCurrentPage}
        />
        <Dropdown
          coinsPerPage={coinsPerPage}
          setCoinsPerPage={setCoinsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <table className="table">
        <thead className="table__head">
          <tr className="table__head-row">
            <th className="table__column-name">#</th>
            <th className="table__column-name">Coin</th>
            <th className="table__column-name">Price</th>
            <th className="table__column-name">1h</th>
            <th className="table__column-name">24h</th>
            <th className="table__column-name">7d</th>
            <th className="table__column-name">24h Volume</th>
            <th className="table__column-name">Mkt Cap</th>
            <th className="table__column-name">Last 7 Days</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {currentCoins.map((item) => {
            return <TableRow key={item.id} {...item} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
