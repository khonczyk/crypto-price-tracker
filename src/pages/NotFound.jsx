import React from 'react';

import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NotFound = () => {
  return (
    <div className="container">
      <div className="not-found">
        <h2 className="not-found__heading">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="not-found__icon"
          />
          Oops! You seem to be lost.
        </h2>
        <p className="not-found__text">Could not find this page.</p>
      </div>
    </div>
  );
};

export default NotFound;
