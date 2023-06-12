import React, { useRef } from 'react';

import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Searchbar = (props) => {
  const { searchTerm, setSearchTerm, setCurrentPage } = props;
  const searchTermRef = useRef();

  return (
    <div className="searchbar">
      {searchTerm.trim() === '' ? (
        <div className="searchbar__container">
          <FontAwesomeIcon icon={faSearch} className="searchbar__icon" />
          <input
            ref={searchTermRef}
            type="text"
            placeholder="Search filter"
            className="searchbar__input"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                if (searchTermRef.current.value.trim() === '') return;

                setCurrentPage(1);
                setSearchTerm(searchTermRef.current.value.trim());
                searchTermRef.current.value = '';
              }
            }}
          />
        </div>
      ) : (
        <div
          className="searchbar__filter"
          onClick={() => {
            setCurrentPage(1);
            setSearchTerm('');
          }}
        >
          <FontAwesomeIcon icon={faTimes} className="searchbar__filter-icon" />
          <span className="searchbar__filter-text">"{searchTerm}"</span>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
