import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPredictions, selectPredictions } from '../../redux/slice/predictionsSlice';
import FreeCombosList from '../free_combos/Free_CombosList';
import PaidCombosList from '../paid_combos/Paid_CombosList';

const PredictionsList = () => {
  const dispatch = useDispatch();
  const predictions = useSelector(selectPredictions);

  useEffect(() => {
    dispatch(fetchPredictions());
  }, [dispatch]);

  return (
    <div>
      <PaidCombosList />
      <FreeCombosList />
      <div className="free-singles-container">
        <h2>Free singles</h2>
        {predictions.map((prediction) => (
          <div key={prediction.id} className="free-singles">
            <div className="free-teams">
              <div className="team">
                <img src={prediction.home_team_logo} alt="home team logo" />
                <h3>{prediction.home_team}</h3>
              </div>
              <div className="league-tip">
                <h3>{prediction.league}</h3>
                <h3>{prediction.tip}</h3>
              </div>
              <div className="team">
                <img src={prediction.away_team_logo} alt="away team logo" />
                <h3>{prediction.away_team}</h3>
              </div>
            </div>
            <div className="datetime-result">
              <h3>
                Date:
                {prediction.date}
              </h3>
              <h3>
                Time:
                {prediction.time}
              </h3>
              <h3>
                Results:
                {prediction.result}
              </h3>
            </div>
            <Link className="h-h" to={`/details/${prediction.id}`}>Head To Head</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionsList;
