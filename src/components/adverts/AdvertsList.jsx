import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { fetchAdverts, selectAdverts } from '../../redux/slice/advertsSlice';

const AdvertsList = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAdverts);

  useEffect(() => {
    dispatch(fetchAdverts());
  }, [dispatch]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 9000,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div className="carousel-container">
      <Slider
        dots={sliderSettings.dots}
        infinite={sliderSettings.infinite}
        speed={sliderSettings.speed}
        slidesToShow={sliderSettings.slidesToShow}
        slidesToScroll={sliderSettings.slidesToScroll}
        initialSlide={currentSlide}
        beforeChange={sliderSettings.beforeChange}
        autoplay={sliderSettings.autoplay}
        autoplaySpeed={sliderSettings.autoplaySpeed}
      >
        {adverts.map((advert) => (
          <div className="adverts-container" key={advert.id}>
            <img src={advert.image} alt="advert" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AdvertsList;
