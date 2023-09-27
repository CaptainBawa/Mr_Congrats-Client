import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdverts, selectAdverts } from '../../redux/slice/advertsSlice';

const AdvertsList = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAdverts);

  useEffect(() => {
    dispatch(fetchAdverts());
  }, [dispatch]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? adverts.length - 1 : newIndex;
    });
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= adverts.length ? 0 : nextIndex;
    });
  }, [adverts]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="carousel-container">
      <button type="button" onClick={prevSlide} className="prev-button">
        &#10094;
      </button>
      <button type="button" onClick={nextSlide} className="next-button">
        &#10095;
      </button>
      <div className="slider-content">
        {adverts.map((advert) => (
          <img
            key={advert.id}
            src={advert.image}
            alt="advert"
            className={`slide ${advert.id === adverts[currentIndex].id ? 'active' : ''}`}
            style={{ display: advert.id === adverts[currentIndex].id ? 'block' : 'none' }}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvertsList;
