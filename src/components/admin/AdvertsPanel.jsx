import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAdvert, deleteAdvert } from '../../redux/slice/advertsSlice';

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

  const handleAdvertDelete = (id) => {
    dispatch(deleteAdvert(id))
      .catch((error) => {
        throw new Error('Failed to delete advert', error);
      });
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
      {adverts.map((advert) => (
        <div key={advert.id}>
          <img src={advert.image} alt="ads banners" />
          <button id="btn-bg-red" type="button" onClick={() => handleAdvertDelete(advert.id)}>Delete</button>
        </div>
      ))}
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
