import React from 'react';

const Pagination = ({
  totalCoins,
  currentPage,
  coinsPerPage,
  setCurrentPage,
}) => {
  const lastPage = Math.ceil(totalCoins / coinsPerPage);
  let pageNumbers = [];

  let leftSideNumbers = [];
  for (let i = 1; i < currentPage; i++) {
    leftSideNumbers.push(i);
  }
  if (leftSideNumbers.length > 7) {
    leftSideNumbers = leftSideNumbers.slice(-4);
    leftSideNumbers.unshift('...');
    leftSideNumbers.unshift(1);
  }

  let rightSideNumbers = [];
  for (let i = currentPage + 1; i <= lastPage; i++) {
    rightSideNumbers.push(i);
  }
  if (rightSideNumbers.length > 7) {
    rightSideNumbers = rightSideNumbers.slice(0, 4);
    rightSideNumbers.push('...');
    rightSideNumbers.push(lastPage);
  }

  pageNumbers = [...leftSideNumbers, currentPage, ...rightSideNumbers];

  return (
    <nav className="pagination container u-margin-bottom-big">
      <ul className="pagination__list">
        <li
          className={`pagination__item ${
            currentPage === 1 ? 'pagination__item--disabled' : ''
          }`}
        >
          <button
            className="pagination__btn"
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          >
            &lsaquo;
          </button>
        </li>
        {pageNumbers.map((number, idx) => {
          if (number !== '...') {
            return (
              <li
                key={idx}
                className={`pagination__item ${
                  number === currentPage ? 'pagination__item--active' : ''
                }`}
              >
                <button
                  className="pagination__btn"
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </button>
              </li>
            );
          } else {
            return (
              <li
                key={idx}
                className="pagination__item pagination__item--disabled"
              >
                <button className="pagination__btn">...</button>
              </li>
            );
          }
        })}
        <li
          className={`pagination__item ${
            currentPage === lastPage ? 'pagination__item--disabled' : ''
          }`}
        >
          <button
            className="pagination__btn"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          >
            &rsaquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
