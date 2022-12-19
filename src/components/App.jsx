import { GlobalStyle } from './GlobalStyles';
import { Searchbar } from './Searchbar/Searchbar';
import { useEffect, useState, useRef } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'api';
import { Button } from './Button/Button';
import { Layout } from './Layout';
import { ImageSkeleton } from './Skeleton/Skeleton';
import toast, { Toaster } from 'react-hot-toast';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  const itemRef = useRef();
  function scroll() {
    const { height: cardHeight } = itemRef.current.getBoundingClientRect();
    window.scrollTo({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
  useEffect(() => {
    if (searchName === '') {
      return;
    }
    async function showImages() {
      try {
        setIsLoading(true);
        setError(null);

        const { images, totalPages } = await fetchImages({
          searchName,
          currentPage,
        });

        setImages(prevImages => [...prevImages, ...images]);
        setTotalPages(totalPages);
        if (images.length < 1) {
          toast.error(
            'Sorry, we didn`t find images according to your request.'
          );
        }
      } catch {
        setError(toast.error("This didn't work.Please try again later !"));
      } finally {
        setIsLoading(false);
      }
    }
    showImages();

    return () => {};
  }, [searchName, currentPage]);

  const handleSubmit = searchName => {
    setSearchName(searchName);
    setImages([]);
    setCurrentPage(1);
    if (searchName === '') {
      toast.error('Please input search query!');
    }
  };

  const loadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    scroll();
  };

  return (
    <Layout>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery ref={itemRef} images={images} />}
      {isLoading && <ImageSkeleton />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore} />
      )}

      <GlobalStyle />
      <Toaster position="top-right" />
    </Layout>
  );
}
