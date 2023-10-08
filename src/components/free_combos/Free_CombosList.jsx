import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFreeCombos, selectFreeCombos } from '../../redux/slice/freeCombosSlice';

const FreeCombosList = () => {
  const dispatch = useDispatch();
  const freecombos = useSelector(selectFreeCombos);

  useEffect(() => {
    dispatch(fetchFreeCombos());
  }, [dispatch]);

  const totalOdds = freecombos.reduce((total, freecombo) => total + freecombo.odd, 0);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const amOrPm = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    const formattedMinutes = parseInt(minutes, 10) < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}${amOrPm}`;
  };

  return (
    <div className="table-container">
      <h2>Free Combo</h2>
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>League</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Tip</th>
            <th>Odd</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {freecombos.map((freecombo) => (
            <tr key={freecombo.id}>
              <td>{freecombo.date}</td>
              <td>{formatTime(freecombo.time)}</td>
              <td>{freecombo.league}</td>
              <td>{freecombo.home_team}</td>
              <td>{freecombo.away_team}</td>
              <td>{freecombo.tip}</td>
              <td>{freecombo.odd}</td>
              <td>{freecombo.result}</td>
            </tr>
          ))}
          <tr>
            <td>Total Odds:</td>
            <td>{totalOdds}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FreeCombosList;
