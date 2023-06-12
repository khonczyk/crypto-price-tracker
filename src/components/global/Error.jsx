import React from 'react';

import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Error = () => {
  return (
    <div className="error__container">
      <FontAwesomeIcon icon={faTriangleExclamation} className="error__icon" />
      <p className="error__text">Couldn't fetch data, check the console.</p>
    </div>
  );
};

export default Error;
