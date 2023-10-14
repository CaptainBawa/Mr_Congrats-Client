import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAdvert } from '../../redux/slice/advertsSlice';

const AdvertsPanel = () => {
  const dispatch = useDispatch();
  const adverts = useSelector((state) => state.adverts?.adverts);
  const [newAdvertsData, setNewAdvertsData] = useState({
    image: '',
  });

  const handleAdvertInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdvertsData({ ...newAdvertsData, [name]: value });
  };

  const handleAdvertsAdd = () => {
    dispatch(createAdvert({ advert: newAdvertsData }))
      .then(() => {
        setNewAdvertsData({
          image: '',
        });
      });
  };

  return (
    <div>
      {adverts.map((advert) => <img key={advert.id} src={advert.image} alt="ads banners" />)}
      <div>
        <h2>Add Advert</h2>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newAdvertsData.image}
          onChange={handleAdvertInputChange}
        />
        <button type="button" onClick={handleAdvertsAdd}>Add Advert</button>
      </div>
    </div>
  );
};

export default AdvertsPanel;
