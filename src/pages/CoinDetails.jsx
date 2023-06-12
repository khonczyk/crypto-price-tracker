import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CoinChart from '../components/coinDetails/CoinChart';
import Loader from '../components/global/Loader';
import Error from '../components/global/Error';

const CoinDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coinDetails, setCoinDetails] = useState(null);

  const linkFormatter = (link) => {
    if (!link) return;

    let newLink;
    newLink = link.slice(link.indexOf('//') + 2);
    if (newLink[newLink.length - 1] === '/') newLink = newLink.slice(0, -1);

    return newLink;
  };

  const fetchCoinDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      const data = await response.json();

      if (data) {
        const {
          id,
          image,
          market_cap_rank,
          name,
          symbol,
          market_data,
          links,
          description,
        } = data;

        const formattedCoinDetails = {
          id: id,
          logo: image?.thumb,
          rank: market_cap_rank,
          name: name,
          symbol: symbol,
          currentPrice: market_data?.current_price?.usd,
          high24h: market_data?.high_24h?.usd,
          low24h: market_data?.low_24h?.usd,
          change7d: market_data?.price_change_percentage_7d,
          marketCap: market_data?.market_cap?.usd,
          circulatingSupply: market_data?.circulating_supply,
          totalVolume: market_data?.total_volume?.usd,
          totalSupply: market_data?.total_supply,
          dilutedValuation: market_data?.fully_diluted_valuation?.usd,
          maxSupply: market_data?.max_supply,
          ath: market_data?.ath?.usd,
          athDate: market_data?.ath_date?.usd,
          atl: market_data?.atl?.usd,
          atlDate: market_data?.atl_date?.usd,
          description: description?.en,
          links: links,
        };
        setCoinDetails(formattedCoinDetails);
      } else {
        setCoinDetails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log('There was an error', error);
      setLoading(false);
      setError(true);
    }
  }, [id]);

  useEffect(() => {
    fetchCoinDetails();
  }, [fetchCoinDetails]);

  if (loading) return <Loader />;
  if (error) return <Error />;

  const progressMax = coinDetails.high24h - coinDetails.low24h;
  const progressValue = coinDetails.currentPrice - coinDetails.low24h;

  const athDateFormatted = new Date(coinDetails.athDate);
  const atlDateFormatted = new Date(coinDetails.atlDate);

  return (
    <>
      <div className="coin-details container u-border-bottom u-padding-bottom-medium">
        <div className="coin-data">
          <div className="coin-data__rank">{`Rank #${coinDetails.rank}`}</div>
          <div className="coin-data__coin">
            <img
              src={coinDetails.logo}
              alt={`Logo ${coinDetails.id}`}
              className="coin-data_logo"
            />
            <div className="coin-data__name">{coinDetails.name}</div>
            <div className="coin-data__ticker">{coinDetails.symbol}</div>
          </div>
          <div className="coin-data__price">{`$${coinDetails.currentPrice.toLocaleString(
            'en-US'
          )}`}</div>
          <div className="coin-progress">
            <div className="coin-progress__container">
              <div
                className="coin-progress__bar"
                style={{ width: `${(progressValue / progressMax) * 100}%` }}
              ></div>
            </div>
            <div className="coin-progress__values">
              <div>${coinDetails.low24h.toLocaleString('en-US')}</div>
              <div>24h Range</div>
              <div>${coinDetails.high24h.toLocaleString('en-US')}</div>
            </div>
          </div>
          <div className="coin-summary">
            <div className="coin-summary__cell">
              <span className="coin-summary__name">Market Cap</span>
              <span className="coin-summary__value">
                $
                {coinDetails.marketCap.toLocaleString('en-US', {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="coin-summary__cell">
              <span className="coin-summary__name">Circulating Supply</span>
              <span className="coin-summary__value">
                {coinDetails.circulatingSupply.toLocaleString('en-US', {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="coin-summary__cell">
              <span className="coin-summary__name">24 Hour Trading Vol</span>
              <span className="coin-summary__value">
                $
                {coinDetails.totalVolume.toLocaleString('en-US', {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="coin-summary__cell">
              <span className="coin-summary__name">Total Supply</span>
              <span className="coin-summary__value">
                {coinDetails.totalSupply?.toLocaleString('en-US', {
                  maximumFractionDigits: 0,
                }) || '∞'}
              </span>
            </div>
            <div className="coin-summary__cell">
              <span className="coin-summary__name">
                Fully Diluted Valuation
              </span>
              <span className="coin-summary__value">
                $
                {coinDetails.dilutedValuation?.toLocaleString('en-US', {
                  maximumFractionDigits: 0,
                }) || '∞'}
              </span>
            </div>
            <div className="coin-summary__cell">
              <span className="coin-summary__name">Max Supply</span>
              <span className="coin-summary__value">
                {coinDetails.maxSupply?.toLocaleString('en-US', {
                  maximumFractionDigits: 0,
                }) || '∞'}
              </span>
            </div>
          </div>
        </div>
        <div className="coin-info">
          <div className="coin-info__title">Info</div>
          <div className="coin-info__row">
            <span className="coin-info__name">Website</span>

            <a
              className="coin-info__links"
              href={coinDetails.links?.homepage[0]}
            >
              {linkFormatter(coinDetails.links?.homepage[0])}
            </a>
          </div>
          <div className="coin-info__row">
            <span className="coin-info__name">Explorers</span>
            <a
              className="coin-info__links"
              href={coinDetails.links.blockchain_site[0]}
            >
              {linkFormatter(coinDetails.links?.blockchain_site[0])}
            </a>
          </div>
          <div className="coin-info__row">
            <span className="coin-info__name">Search on Twitter</span>

            <a
              className="coin-info__links"
              href={`https://twitter.com/search?q=$${coinDetails.symbol}`}
            >
              {linkFormatter(
                `https://twitter.com/search?q=$${coinDetails.symbol}`
              )}
            </a>
          </div>
          <div className="coin-info__row">
            <span className="coin-info__name">Source code</span>

            <a
              className="coin-info__links"
              href={coinDetails.links.repos_url.github[0]}
            >
              {linkFormatter(coinDetails.links.repos_url.github[0])}
            </a>
          </div>
        </div>
      </div>
      <div className="chart-section container u-border-bottom">
        <div className="chart">
          <CoinChart id={id} change7d={coinDetails.change7d} />
        </div>
        <div className="coin-statistics">
          <div className="coin-statistics__title">
            <span>{coinDetails.symbol}</span>
            <span> Price Statistics</span>
          </div>
          <div className="coin-statistics__row">
            <span className="coin-statistics__name">{`${coinDetails.name} Price`}</span>
            <span className="coin-statistics__value">
              ${coinDetails.currentPrice}
            </span>
          </div>
          <div className="coin-statistics__row">
            <span className="coin-statistics__name">24h Low / 24h High</span>
            <span className="coin-statistics__value">
              <span>${coinDetails.low24h.toLocaleString('en-US')}</span>
              <span> / </span>
              <span>${coinDetails.high24h.toLocaleString('en-US')}</span>
            </span>
          </div>
          <div className="coin-statistics__row">
            <span className="coin-statistics__name">Trading Volume</span>
            <span className="coin-statistics__value">
              $
              {coinDetails.totalVolume.toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
          <div className="coin-statistics__row">
            <div className="coin-statistics__name">Market Cap Rank</div>
            <div className="coin-statistics__value">#{coinDetails.rank}</div>
          </div>
          <div className="coin-statistics__row">
            <span className="coin-statistics__name">Market Cap</span>
            <span className="coin-statistics__value">
              $
              {coinDetails.marketCap.toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
          <div className="coin-statistics__row">
            <span className="coin-statistics__name">All-Time High</span>
            <span className="coin-statistics__value">
              ${coinDetails.ath.toLocaleString('en-US')}
            </span>
            <span className="coin-statistics__value-date">
              {athDateFormatted.toLocaleDateString('en-US', {
                dateStyle: 'medium',
              })}
            </span>
          </div>
          <div className="coin-statistics__row">
            <span className="coin-statistics__name">All-Time Low</span>
            <span className="coin-statistics__value">
              $
              {coinDetails.atl.toLocaleString('en-US', {
                maximumFractionDigits: 5,
              })}
            </span>
            <span className="coin-statistics__value-date">
              {atlDateFormatted.toLocaleString('en-US', {
                dateStyle: 'medium',
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="about-section container u-margin-bottom-big">
        <h2 className="heading-secondary">{`What is ${coinDetails.name}?`}</h2>
        {!coinDetails.description ||
        coinDetails.description.trim().length <= 0 ? (
          <p className="paragraph">{`There is no description available for "${id}" (${coinDetails.name})`}</p>
        ) : (
          <p
            className="paragraph"
            dangerouslySetInnerHTML={{ __html: `${coinDetails.description}` }}
          ></p>
        )}
      </div>
    </>
  );
};

export default CoinDetails;
