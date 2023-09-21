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

  return (
    <div>
      <table>
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
              <td>{freecombo.time}</td>
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
