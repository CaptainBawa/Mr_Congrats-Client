import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createDetail } from '../../redux/slice/detailsSlice';

const DetailsPanel = () => {
  const dispatch = useDispatch();
  const predictions = useSelector((state) => state.predictions?.predictions);
  const [newDetailsData, setNewDetailsData] = useState({
    date: '',
    home_team: '',
    away_team: '',
    result: '',
    league: '',
    text: '',
    prediction_id: '',
  });

  const handleDetailsInputChange = (e) => {
    const { name, value } = e.target;
    setNewDetailsData({ ...newDetailsData, [name]: value });
  };

  const handleDetailsAdd = () => {
    dispatch(createDetail({ detail: newDetailsData, id: newDetailsData.prediction_id }))
      .then(() => {
        setNewDetailsData({
          date: '',
          home_team: '',
          away_team: '',
          result: '',
          league: '',
          text: '',
          prediction_id: '',
        });
      });
  };

  return (
    <div className="admin-data">
      <div className="add-data">
        <h2>Add Head to Head</h2>
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={newDetailsData.date}
          onChange={handleDetailsInputChange}
        />
        <input
          type="text"
          name="home_team"
          placeholder="Home Team"
          value={newDetailsData.home_team}
          onChange={handleDetailsInputChange}
        />
        <input
          type="text"
          name="away_team"
          placeholder="Away Team"
          value={newDetailsData.away_team}
          onChange={handleDetailsInputChange}
        />
        <input
          type="text"
          name="result"
          placeholder="Results"
          value={newDetailsData.result}
          onChange={handleDetailsInputChange}
        />
        <input
          type="text"
          name="league"
          placeholder="League"
          value={newDetailsData.league}
          onChange={handleDetailsInputChange}
        />
        <select
          name="prediction_id"
          value={newDetailsData.prediction_id}
          onChange={handleDetailsInputChange}
        >
          <option value="">Select Prediction</option>
          {predictions.map((prediction) => (
            <option key={prediction.id} value={prediction.id}>
              {prediction.home_team}
              {' '}
              {prediction.away_team}
            </option>
          ))}
        </select>
        <textarea
          name="text"
          placeholder="text"
          onChange={handleDetailsInputChange}
          value={newDetailsData.text}
        />
        <button type="button" onClick={handleDetailsAdd}>Add Head to Head</button>
      </div>
    </div>
  );
};

export default DetailsPanel;
