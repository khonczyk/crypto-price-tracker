import React, { useContext } from 'react';

import { ThemeContext } from '../../context/theme-context';

import logoDark from '../../assets/logo-dark.webp';
import logoLight from '../../assets/logo-light.webp';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className="u-border-top">
      <div className="footer container u-margin-top-medium">
        <div className="footer__info">
          <img
            src={theme === 'dark' ? logoDark : logoLight}
            alt="Coingecko logo"
            className="footer__logo"
          />
          <p className="footer__paragraph">
            CoinGecko provides a fundamental analysis of the crypto market. In
            addition to tracking price, volume and market capitalisation,
            CoinGecko tracks community growth, open-source code development,
            major events and on-chain metrics.
          </p>
        </div>

        <p className="footer__disclaimer u-margin-top-medium u-center-text">
          The site was created only for educational purposes as part of a
          portfolio. The original site can be found at:
          <a href="https://www.coingecko.com">www.coingecko.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
