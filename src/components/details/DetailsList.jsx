import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchDetails, selectDetails } from '../../redux/slice/detailsSlice';

const DetailsList = () => {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);
  const { predictionId } = useParams();

  useEffect(() => {
    dispatch(fetchDetails(predictionId));
  }, [dispatch, predictionId]);

  if (details.length === 0) {
    return <div>No head to head for this match</div>;
  }

  return (
    <div className="table-container">
      <Link to="/">&larr;</Link>
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>League</th>
            <th>Result</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail.id}>
              <td>{detail.date}</td>
              <td>{detail.home_team}</td>
              <td>{detail.away_team}</td>
              <td>{detail.league}</td>
              <td>{detail.result}</td>
              <td>{detail.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsList;
