import React, { useContext, useState } from 'react';
import millify from 'millify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLevelDown, faLevelUp } from '@fortawesome/free-solid-svg-icons';

import { GlobalContext } from '../../context/global-context';

import Loader from '../global/Loader';
import Error from '../global/Error';

const GeneralInfo = () => {
  const [showStats, setShowStats] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const { loading, error, globalData } = useContext(GlobalContext);

  if (loading) return <Loader />;
  if (error) return <Error />;

  const {
    totalCoins,
    totalMktCap,
    totalMktCapChange,
    totalVolume,
    btcDomination,
    ethDomination,
  } = globalData;

  return (
    <div className="general-info container u-margin-bottom-small">
      <div className="general-info__heading">
        <h1 className="heading-primary">Cryptocurrency Prices by Market Cap</h1>
        <div className="general-info__show-stats">
          <button
            className={`btn-slider ${showStats ? 'btn-slider--active' : ''}`}
            onClick={() => setShowStats((prevShowStats) => !prevShowStats)}
          >
            <div className="btn-slider__circle">&nbsp;</div>
          </button>
          <span className="bold-span">Show Stats</span>
        </div>
      </div>

      <div className="general-info__paragraph">
        <p className="paragraph">
          {`The global cryptocurrency market cap today is $${millify(
            totalMktCap
          )}, a ${totalMktCapChange}% change in the last 24 hours.`}

          <span
            className="btn-read-more"
            onClick={() => setReadMore((prevReadMore) => !prevReadMore)}
          >
            {readMore ? 'Hide' : 'Read More'}
          </span>
        </p>
        {readMore && (
          <p className="paragraph">
            {`Total cryptocurrency trading volume in the last day is at $${millify(
              totalVolume
            )}. Bitcoin dominance is at ${btcDomination}% and Ethereum dominance is at
          ${ethDomination}%. CoinGecko is now tracking ${totalCoins.toLocaleString(
              'en-US',
              {
                maximumFractionDigits: 0,
              }
            )} cryptocurrencies.`}
          </p>
        )}
      </div>

      {showStats && (
        <div className="general-info__stats">
          <div
            className={`general-info__box ${
              totalMktCapChange >= 0
                ? 'general-info__box--green'
                : 'general-info__box--red'
            }`}
          >
            <div>
              {`$${totalMktCap.toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })}`}
              <span
                className={`general-info__percentage ${
                  totalMktCapChange >= 0
                    ? 'general-info__percentage--green'
                    : 'general-info__percentage--red'
                }`}
              >
                {`${totalMktCapChange}%`}
                <FontAwesomeIcon
                  icon={totalMktCapChange >= 0 ? faLevelUp : faLevelDown}
                />
              </span>
            </div>
            <span>Market Capitalization</span>
          </div>
          <div className="general-info__box">
            <div>{`$${totalVolume.toLocaleString('en-US', {
              maximumFractionDigits: 0,
            })}`}</div>
            <span>24h Trading Volume</span>
          </div>
          <div className="general-info__box">
            <div>{`${btcDomination}%`}</div>
            <span>Bitcoin Market Cap Dominance</span>
          </div>
          <div className="general-info__box">
            <div>
              {totalCoins.toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })}
            </div>
            <span># of Coins</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralInfo;
