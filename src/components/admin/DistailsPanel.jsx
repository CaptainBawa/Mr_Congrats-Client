import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDetails, createDetail, deleteDetail,
  updateDetail, selectDetails, selectDetailsStatus,
  selectDetailsError,
} from '../../redux/slice/detailsSlice';

const DetailsPanel = () => {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);
  const status = useSelector(selectDetailsStatus);
  const error = useSelector(selectDetailsError);
  const prediction = useSelector((state) => state.predictions?.prediction?.id);

  const [editDetailId, setEditDetailId] = useState(null);
  const [editedDetailsData, setEditedDetailsData] = useState({});
  const [newDetailsData, setNewDetailsData] = useState({
    date: '',
    home_team: '',
    away_team: '',
    result: '',
    league: '',
    text: '',
    prediction_id: prediction,
  });

  useEffect(() => {
    dispatch(fetchDetails());
  }, [dispatch]);

  const handleDetailsEdit = (detail) => {
    setEditDetailId(detail.id);
    setEditedDetailsData(detail);
  };

  const handleDetailsCancelEdit = () => {
    setEditDetailId(null);
    setEditedDetailsData({});
  };

  const handleDetailsSaveEdit = () => {
    dispatch(updateDetail({ detail: editedDetailsData, id: editDetailId }))
      .then(() => {
        setEditDetailId(null);
        setEditedDetailsData({});
      })
      .catch((error) => {
        throw new Error('Failed to update detail:', error);
      });
  };

  const handleDetailsDelete = (detailId) => {
    dispatch(deleteDetail(detailId))
      .catch((error) => {
        throw new Error('Failed to delete detail:', error);
      });
  };

  const handleDetailsInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetailsData({ ...editedDetailsData, [name]: value });
  };

  const handleDetailsAdd = () => {
    dispatch(createDetail({ detail: newDetailsData }))
      .then(() => {
        setNewDetailsData({
          date: '',
          home_team: '',
          away_team: '',
          result: '',
          league: '',
          text: '',
          prediction_id: prediction,
        });
      });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-data">
      <h2>Head to Head</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Results</th>
            <th>League</th>
            <th>Text</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail.id}>
              <td>{detail.id}</td>
              <td>
                {editDetailId === detail.id ? (
                  <input
                    type="date"
                    value={editedDetailsData.date}
                    onChange={(e) => setEditedDetailsData({
                      ...editedDetailsData,
                      date: e.target.value,
                    })}
                  />
                ) : (
                  detail.date
                )}
              </td>
              <td>
                {editDetailId === detail.id ? (
                  <input
                    type="text"
                    value={editedDetailsData.home_team}
                    onChange={(e) => setEditedDetailsData({
                      ...editedDetailsData,
                      home_team: e.target.value,
                    })}
                  />
                ) : (
                  detail.home_team
                )}
              </td>
              <td>
                {editDetailId === detail.id ? (
                  <input
                    type="text"
                    name="homeTeam"
                    value={editedDetailsData.away_team}
                    onChange={(e) => setEditedDetailsData({
                      ...editedDetailsData,
                      away_team: e.target.value,
                    })}
                  />
                ) : (
                  detail.away_team
                )}
              </td>
              <td>
                {editDetailId === detail.id ? (
                  <input
                    type="text"
                    value={editedDetailsData.result}
                    onChange={(e) => setEditedDetailsData({
                      ...editedDetailsData,
                      result: e.target.value,
                    })}
                  />
                ) : (
                  detail.result
                )}
              </td>
              <td>
                {editDetailId === detail.id ? (
                  <input
                    type="text"
                    value={editedDetailsData.league}
                    onChange={(e) => setEditedDetailsData({
                      ...editedDetailsData,
                      league: e.target.value,
                    })}
                  />
                ) : (
                  detail.league
                )}
              </td>
              <td>
                {editDetailId === detail.id ? (
                  <input
                    type="text"
                    value={editedDetailsData.text}
                    onChange={(e) => setEditedDetailsData({
                      ...editedDetailsData,
                      text: e.target.value,
                    })}
                  />
                ) : (
                  detail.text
                )}
              </td>
              <td>
                {editDetailId === detail.id ? (
                  <>
                    <button type="button" onClick={handleDetailsSaveEdit}>Save</button>
                    <button id="btn-bg-red" type="button" onClick={handleDetailsCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => handleDetailsEdit(detail)}>Edit</button>
                    <button id="btn-bg-red" type="button" onClick={() => handleDetailsDelete(detail.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
