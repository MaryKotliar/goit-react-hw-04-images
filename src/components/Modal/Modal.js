import PropTypes from 'prop-types';
import { Overlay, ModalImage } from './Modal.styled';
import { createPortal } from 'react-dom';

import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImage, tags, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);
  const handleBackdropCloseModal = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropCloseModal}>
      <ModalImage>
        <img src={largeImage} alt={tags} />
      </ModalImage>
    </Overlay>,
    modalRoot
  );
};
Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
