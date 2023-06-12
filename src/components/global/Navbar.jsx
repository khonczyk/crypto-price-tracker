import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faLevelDown,
  faLevelUp,
} from '@fortawesome/free-solid-svg-icons';

import { ThemeContext } from '../../context/theme-context';
import { GlobalContext } from '../../context/global-context';

import Loader from './Loader';

import logoDark from '../../assets/logo-dark.webp';
import logoLight from '../../assets/logo-light.webp';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { loading, error, globalData } = useContext(GlobalContext);

  if (loading) return <Loader />;
  if (error) return <div>Couldnt fetch data, check console</div>;

  const {
    totalCoins,
    totalExchanges,
    totalMktCap,
    totalMktCapChange,
    totalVolume,
    btcDomination,
    ethDomination,
  } = globalData;

  return (
    <header className="header">
      <div className="u-border-bottom">
        <div className="header__info container">
          <div className="summary">
            <ul className="summary__list">
              <li>
                Coins:
                <span className="summary__info summary__info--green">
                  {totalCoins.toLocaleString('en-US', {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </li>
              <li>
                Exchanges:
                <span className="summary__info summary__info--green">
                  {totalExchanges}
                </span>
              </li>
              <li>
                Market Cap:
                <span className="summary__info summary__info--blue">
                  {`$${totalMktCap.toLocaleString('en-US', {
                    maximumFractionDigits: 0,
                  })}`}
                </span>
                <span
                  className={`summary__info ${
                    totalMktCapChange >= 0
                      ? 'summary__info--green'
                      : 'summary__info--red'
                  }`}
                >
                  {`${totalMktCapChange}%`}
                  <FontAwesomeIcon
                    icon={totalMktCapChange >= 0 ? faLevelUp : faLevelDown}
                  />
                </span>
              </li>
              <li>
                24h Vol:
                <span className="summary__info summary__info--blue">
                  {`$${totalVolume.toLocaleString('en-US', {
                    maximumFractionDigits: 0,
                  })}`}
                </span>
              </li>
              <li>
                Dominance:
                <span className="summary__info summary__info--green">
                  {`BTC ${btcDomination}%`}
                </span>
                <span className="summary__info summary__info--green">
                  {`ETH ${ethDomination}%`}
                </span>
              </li>
            </ul>
          </div>
          <div className="settings">
            <FontAwesomeIcon
              icon={theme === 'dark' ? faSun : faMoon}
              className="settings__theme"
              onClick={toggleTheme}
            />
          </div>
        </div>
      </div>
      <div className="u-border-bottom">
        <div className="header__nav container">
          <nav className="navigation">
            <Link to="/">
              <img
                src={theme === 'dark' ? logoDark : logoLight}
                alt="Logo"
                className="navigation__logo"
              />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
