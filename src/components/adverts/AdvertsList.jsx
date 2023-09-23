import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdverts, selectAdverts } from '../../redux/slice/advertsSlice';

const AdvertsList = () => {
  const dispatch = useDispatch();
  const adverts = useSelector(selectAdverts);

  useEffect(() => {
    dispatch(fetchAdverts());
  }, [dispatch]);

  return (
    <>
      {adverts.map((advert) => (
        <div key={advert.id}>
          <img src={advert.image} alt="advert" />
        </div>
      ))}
    </>
  );
};

export default AdvertsList;
