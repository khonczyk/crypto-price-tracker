import React from 'react';

const DescriptionMktCap = () => {
  return (
    <div className="container u-margin-bottom-big">
      <h2 className="heading-secondary">What is Crypto Market Cap?</h2>
      <p className="paragraph">
        Crypto market cap is the total value of all the coins of a particular
        cryptocurrency that have been mined or are in circulation. Market
        capitalization is used to determine the ranking of cryptocurrencies. The
        higher the market cap of a particular crypto coin, the higher its
        ranking and share of the market. Crypto market cap is calculated by
        multiplying the total number of coins in circulation by its current
        price. For instance, to calculate the market cap of Ethereum, all you
        need to do is multiply the total number of Ethereum in circulation by
        the current price of one Ethereum and you will get its market cap.
      </p>
      <h2 className="heading-secondary">
        How to compare Cryptocurrencies Market Cap?
      </h2>

      <p className="paragraph">
        Crypto market cap can be divided into three categories:
      </p>
      <ul className="list">
        <li>Large-cap cryptocurrencies (&gt;$10 billion)</li>
        <li>Mid-cap Cryptocurrencies ($1 billion - $10 billion)</li>
        <li>Small-cap cryptocurrencies (&lt;$1 billion)</li>
      </ul>

      <p className="paragraph">
        As a financial metric, market cap allows you to compare the total
        circulating value of one cryptocurrency with another. Large cap
        cryptocurrencies such as Bitcoin and Ethereum have a market cap of over
        $10 billion. They typically consist of protocols that have demonstrated
        track records, and have a vibrant ecosystem of developers maintaining
        and enhancing the protocol, as well as building new projects on top of
        them. While market cap is a simple and intuitive comparison metric, it
        is not a perfect point of comparison. Some cryptocurrency projects may
        appear to have inflated market cap through price swings and the
        tokenomics of their supply. As such, it is best to use this metric as a
        reference alongside other metrics such as trading volume, liquidity,
        fully diluted valuation, and fundamentals during your research process.
      </p>
      <h2 className="heading-secondary">
        What is 24h Volume in the Table Above?
      </h2>
      <p className="paragraph">
        The 24h trading volume refers to the amount a cryptocurrency has been
        bought and sold on all exchanges within the last 24 hours on the spot
        market. For instance, if the 24h volume for Ethereum is $15 billion, it
        means that $15 billion worth of Ether had changed hands across all
        exchanges in the last 24 hours.
      </p>
    </div>
  );
};

export default DescriptionMktCap;
