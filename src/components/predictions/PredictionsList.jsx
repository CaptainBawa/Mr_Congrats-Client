import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPredictions, selectPredictions } from '../../redux/slice/predictionsSlice';

const PredictionsList = () => {
  const dispatch = useDispatch();
  const predictions = useSelector(selectPredictions);

  useEffect(() => {
    dispatch(fetchPredictions());
  }, [dispatch]);

  return (
    <div>
      {predictions.map((prediction) => (
        <div key={prediction.id}>
          <h3>{prediction.date}</h3>
          <h3>{prediction.time}</h3>
          <h3>{prediction.home_team}</h3>
          <img src={prediction.home_team_logo} alt="home team logo" />
          <h3>{prediction.away_team}</h3>
          <img src={prediction.away_team_logo} alt="away team logo" />
          <h3>{prediction.tip}</h3>
          <h3>{prediction.result}</h3>
          <h3>{prediction.league}</h3>
        </div>
      ))}
    </div>
  );
};

export default PredictionsList;
