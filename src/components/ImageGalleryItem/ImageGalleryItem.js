import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { useState, useRef, useEffect } from 'react';
const scrollToElem = (elem, offset = 0) => {
  const y = elem.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

export const GalleryItemContent = ({ image, largeImage, tags, isAnchor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const imgRef = useRef();
  useEffect(() => {
    if (!imgRef.current) return;
    scrollToElem(imgRef.current, 90);
  }, []);

  const showModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <img
        onClick={showModal}
        src={image}
        alt={tags}
        ref={isAnchor ? imgRef : null}
      />
      {isOpen && (
        <Modal closeModal={closeModal} largeImage={largeImage} tags={tags} />
      )}
    </>
  );
};
GalleryItemContent.propTypes = {
  image: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
