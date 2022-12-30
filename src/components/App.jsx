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

  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    async function showImages() {
      try {
        setIsLoading(true);

        const { images, totalPages } = await fetchImages({
          searchName,
          currentPage,
        });
        if (images.length < 1) {
          toast.error(
            'Sorry, we didn`t find images according to your request.'
          );
          return;
        }
        setImages(prevImages => [...prevImages, ...images]);
        setTotalPages(totalPages);
      } catch {
        toast.error("This didn't work.Please try again later !");
      } finally {
        setIsLoading(false);
      }
    }
    showImages();

    return () => {};
  }, [searchName, currentPage]);

  const handleSubmit = searchName => {
    if (searchName === '') {
      toast.error('Please input search query!');
      return;
    }
    setSearchName(searchName);
    setImages([]);
    setCurrentPage(1);
  };

  const loadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  return (
    <Layout>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && <ImageSkeleton />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore} />
      )}

      <GlobalStyle />
      <Toaster position="top-right" />
    </Layout>
  );
}
