import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPredictions, selectPredictions } from '../../redux/slice/predictionsSlice';
import FreeCombosList from '../free_combos/Free_CombosList';
import PaidCombosList from '../paid_combos/Paid_CombosList';
import SubscriptionNote from '../SubscriptionNote';
import Note from '../Note';

const PredictionsList = () => {
  const dispatch = useDispatch();
  const predictions = useSelector(selectPredictions);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const subscriptionStatus = useSelector((state) => state.auth.user?.data?.subscription_status);

  useEffect(() => {
    dispatch(fetchPredictions());
  }, [dispatch]);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const amOrPm = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    const formattedMinutes = parseInt(minutes, 10) < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}${amOrPm}`;
  };

  let content;
  if (isAuth && subscriptionStatus === true) {
    content = (
      <>
        <PaidCombosList />
        <FreeCombosList />
      </>
    );
  } else if (isAuth && subscriptionStatus === false) {
    content = (
      <>
        <Note />
        <FreeCombosList />
      </>
    );
  } else {
    content = (
      <>
        <SubscriptionNote />
        <FreeCombosList />
      </>
    );
  }

  return (
    <div>
      {content}
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
                {formatTime(prediction.time)}
              </h3>
              <h3>
                Results:
                {prediction.result}
              </h3>
            </div>
            <Link className="h-h" to={`/predictions/${prediction.id}/details`}>Head To Head</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionsList;
