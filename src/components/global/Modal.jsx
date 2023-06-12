import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import geckoIcon from '../../assets/gecko.svg';

const Modal = () => {
  const [firstRender, setFirstRender] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  if (!openModal)
    return (
      <div
        className={`modal__gecko ${firstRender ? `modal__gecko--popping` : ''}`}
        onClick={() => {
          setOpenModal(true);
          setFirstRender(false);
        }}
      >
        <img src={geckoIcon} alt="Gecko icon" />
      </div>
    );

  if (openModal)
    return (
      <div className="modal__background">
        <div className="modal__container">
          <button className="modal__close" onClick={() => setOpenModal(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <p className="modal__heading">Please note!</p>
          <p className="modal__text">This site uses the free public API:</p>
          <a
            className="modal__link"
            href="https://www.coingecko.com/en/api/documentation"
          >
            https://www.coingecko.com/en/api/documentation
          </a>
          <p className="modal__text">
            Public API has a rate limit of <strong>10-30 calls/minute</strong>,
            and doesn't come with API key.
          </p>
        </div>
      </div>
    );
};

export default Modal;
