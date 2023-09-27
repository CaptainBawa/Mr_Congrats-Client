import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { fetchAdverts, selectAdverts } from '../../redux/slice/advertsSlice';

const AdvertsList = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAdverts);

  useEffect(() => {
    dispatch(fetchAdverts());
  }, [dispatch]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 9000,
  };

  return (
    <div className="carousel-container">
      <Slider
        dots={sliderSettings.dots}
        infinite={sliderSettings.infinite}
        speed={sliderSettings.speed}
        slidesToShow={sliderSettings.slidesToShow}
        slidesToScroll={sliderSettings.slidesToScroll}
        autoplay={sliderSettings.autoplay}
        centerMode={sliderSettings.centerMode}
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
