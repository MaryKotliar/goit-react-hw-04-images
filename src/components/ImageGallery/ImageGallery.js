import PropTypes from 'prop-types';
import { Gallery, GalleryItem } from './ImageGallery.styled';
import { GalleryItemContent } from 'components/ImageGalleryItem/ImageGalleryItem';
import { forwardRef } from 'react';
export const ImageGallery = forwardRef(({ images }, ref) => {
  return (
    <>
      <Gallery>
        {images.map(image => (
          <GalleryItem ref={ref} key={image.id}>
            <GalleryItemContent
              image={image.webformatURL}
              largeImage={image.largeImageURL}
              tags={image.tags}
            ></GalleryItemContent>
          </GalleryItem>
        ))}
      </Gallery>
    </>
  );
});
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
