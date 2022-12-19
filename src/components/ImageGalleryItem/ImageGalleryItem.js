import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const GalleryItemContent = ({ image, largeImage, tags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <img onClick={showModal} src={image} alt={tags} />
      {isOpen && (
        <Modal
          closeModal={closeModal}
          largeImage={largeImage}
          tags={tags}
        ></Modal>
      )}
    </>
  );
};
GalleryItemContent.propTypes = {
  image: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
