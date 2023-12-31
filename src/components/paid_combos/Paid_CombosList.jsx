import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPaidCombos, selectPaidCombos } from '../../redux/slice/paidCombosSlice';

const PaidCombosList = () => {
  const dispatch = useDispatch();
  const paidcombos = useSelector(selectPaidCombos);

  useEffect(() => {
    dispatch(fetchPaidCombos());
  }, [dispatch]);

  const totalOdds = paidcombos.reduce((total, paidcombo) => total + paidcombo.odd, 0);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const amOrPm = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    const formattedMinutes = parseInt(minutes, 10) < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}${amOrPm}`;
  };

  return (
    <div className="table-container">
      <h2>Paid combo: For subscribed users only</h2>
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
          {paidcombos.map((paidcombo) => (
            <tr key={paidcombo.id}>
              <td>{paidcombo.date}</td>
              <td>{formatTime(paidcombo.time)}</td>
              <td>{paidcombo.league}</td>
              <td>{paidcombo.home_team}</td>
              <td>{paidcombo.away_team}</td>
              <td>{paidcombo.tip}</td>
              <td>{paidcombo.odd}</td>
              <td>{paidcombo.result}</td>
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

export default PaidCombosList;
