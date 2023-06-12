import React, { useState } from 'react';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dropdown = (props) => {
  const { coinsPerPage, setCoinsPerPage, setCurrentPage } = props;
  const [open, setOpen] = useState(false);

  const amountOptions = [10, 25, 50, 75, 100];

  return (
    <div className="dropdown">
      <div className="dropdown__object">
        <span className="dropdown__info">Show rows</span>
        <button
          className="dropdown__button"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          {coinsPerPage}
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
      </div>
      {open && (
        <ul className="dropdown__list">
          {amountOptions.map((option) => (
            <li
              key={option}
              className={`dropdown__item ${
                coinsPerPage === option ? 'dropdown__item--selected' : ''
              }`}
              onClick={() => {
                setCoinsPerPage(option);
                setCurrentPage(1);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
