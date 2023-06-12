import React from 'react';
import { Link } from 'react-router-dom';

import SmallChart from './SmallChart';

const TableRow = (props) => {
  const {
    id,
    name,
    symbol,
    image,
    currentPrice,
    change1h,
    change24h,
    change7d,
    volume24h,
    marketCap,
    marketCapRank,
    last7days,
  } = props;

  return (
    <tr className="table-row">
      <td>
        <div className="table-row__number">{marketCapRank}</div>
      </td>
      <td>
        <div className="table-row__coin">
          <img src={image} alt={`${name} logo`} />
          <Link to={`/coins/${id}`}>
            <span className="coin-name">{name}</span>
            <span className="coin-ticker">{symbol}</span>
          </Link>
        </div>
      </td>
      <td>
        <div className="table-row__price">
          $
          {currentPrice?.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </td>
      <td>
        <div
          className={`table-row__changePercentage ${
            change1h >= 0
              ? 'table-row__changePercentage--green'
              : 'table-row__changePercentage--red'
          }`}
        >
          {change1h?.toFixed(2)}%
        </div>
      </td>
      <td>
        <div
          className={`table-row__changePercentage ${
            change24h >= 0
              ? 'table-row__changePercentage--green'
              : 'table-row__changePercentage--red'
          }`}
        >
          {change24h?.toFixed(2)}%
        </div>
      </td>
      <td>
        <div
          className={`table-row__changePercentage ${
            change7d >= 0
              ? 'table-row__changePercentage--green'
              : 'table-row__changePercentage--red'
          }`}
        >
          {change7d?.toFixed(2)}%
        </div>
      </td>
      <td className="table-data__volume24h">
        <div className="table-row__volume24h">
          $
          {volume24h?.toLocaleString('en-US', {
            maximumFractionDigits: 0,
          })}
        </div>
      </td>
      <td>
        <div className="table-row__mktcap">
          $
          {marketCap?.toLocaleString('en-US', {
            maximumFractionDigits: 0,
          })}
        </div>
      </td>
      <td>
        <div className="table-row__chart">
          <SmallChart points={last7days} change7d={change7d} />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
