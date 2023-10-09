import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPredictions,
  selectPredictionsStatus,
  selectPredictionsError,
  fetchPredictions,
  createPrediction,
  deletePrediction,
  updatePrediction,
} from '../../redux/slice/predictionsSlice';

const PredictionsPanel = () => {
  const dispatch = useDispatch();
  const predictions = useSelector(selectPredictions);
  const status = useSelector(selectPredictionsStatus);
  const error = useSelector(selectPredictionsError);
  const user = useSelector((state) => state.auth.user?.data?.id);

  const [editPredictionId, setEditPredictionId] = useState(null);
  const [editedPredictionData, setEditedPredictionData] = useState({});
  const [newPredictionData, setNewPredictionData] = useState({
    date: '',
    time: '',
    league: '',
    home_team_logo: '',
    away_team_logo: '',
    home_team: '',
    away_team: '',
    tip: '',
    result: '',
    user_id: user,
  });

  useEffect(() => {
    dispatch(fetchPredictions());
  }, [dispatch]);

  const handleEdit = (prediction) => {
    setEditPredictionId(prediction.id);
    setEditedPredictionData(prediction);
  };

  const handleCancelEdit = () => {
    setEditPredictionId(null);
    setEditedPredictionData({});
  };

  const handleSaveEdit = () => {
    dispatch(updatePrediction({ prediction: editedPredictionData, id: editPredictionId }))
      .then(() => {
        setEditPredictionId(null);
        setEditedPredictionData({});
      })
      .catch((error) => {
        throw new Error('Failed to update prediction:', error);
      });
  };

  const handleDelete = (id) => {
    dispatch(deletePrediction(id))
      .catch((error) => {
        throw new Error('Failed to delete prediction:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPredictionData({ ...newPredictionData, [name]: value });
  };

  const handleAddPrediction = () => {
    dispatch(createPrediction({ prediction: newPredictionData }))
      .then(() => {
        setNewPredictionData({
          date: '',
          time: '',
          league: '',
          home_team_logo: '',
          away_team_logo: '',
          home_team: '',
          away_team: '',
          tip: '',
          result: '',
          user_id: user,
        });
      })
      .catch((error) => {
        throw new Error('Failed to create prediction:', error);
      });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const amOrPm = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    const formattedMinutes = parseInt(minutes, 10) < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}${amOrPm}`;
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-data">
      <h2>All single predictions</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>League</th>
            <th>Home Team Logo</th>
            <th>Away Team Logo</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Tip</th>
            <th>Results</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction) => (
            <tr key={prediction.id}>
              <td>{prediction.id}</td>
              <td>
                {editPredictionId === prediction.id ? (
                  <input
                    type="date"
                    value={editedPredictionData.date}
                    onChange={(e) => setEditedPredictionData({
                      ...editedPredictionData,
                      date: e.target.value,
                    })}
                  />
                ) : (
                  prediction.date
                )}
              </td>
              <td>
                {editPredictionId === prediction.id ? (
                  <input
                    type="text"
                    value={editedPredictionData.time}
                    onChange={(e) => setEditedPredictionData({
                      ...editedPredictionData,
                      time: e.target.value,
                    })}
                  />
                ) : (
                  formatTime(prediction.time)
                )}
              </td>
              <td>
                {editPredictionId === prediction.id ? (
                  <input
                    type="text"
                    value={editedPredictionData.league}
                    onChange={(e) => setEditedPredictionData({
                      ...editedPredictionData,
                      league: e.target.value,
                    })}
                  />
                ) : (
                  prediction.league
                )}
              </td>
              <td>
                {editPredictionId === prediction.id ? (
                  <input
                    type="text"
                    value={editedPredictionData.home_team_logo}
                    onChange={(e) => setEditedPredictionData({
                      ...editedPredictionData,
                      home_team_logo: e.target.value,
                    })}
                  />
                ) : (
                  prediction.home_team_logo
                )}
              </td>
              <td>
                {editPredictionId === prediction.id ? (
                  <input
                    type="text"
                    value={editedPredictionData.away_team_logo}
                    onChange={(e) => setEditedPredictionData({
                      ...editedPredictionData,
                      away_team_logo: e.target.value,
                    })}
                  />
                ) : (
                  prediction.away_team_logo
                )}
              </td>
              <td>
                {editPredictionId === prediction.id ? (
                  <input
                    type="text"
                    value={editedPredictionData.home_team}
                    onChange={(e) => setEditedPredictionData({
                      ...editedPredictionData,
                      home_team: e.target.value,
                    })}
                  />
                ) : (
                  prediction.home_team
                )}
              </td>
              <td>
                {editPredictionId === prediction.id ? (
                  <input
                    type="text"
                    name="homeTeam"
                    value={editedPredictionData.away_team}
                    onChange={(e) => setEditedPredictionData({
                      ...editedPredictionData,
                      away_team: e.target.value,
                    })}
                  />
                ) : (
                  prediction.away_team
                )}
              </td>
              <td>
                {editPredictionId === prediction.id ? (
                  <input
                    type="text"
                    value={editedPredictionData.tip}
                    onChange={(e) => setEditedPredictionData({
                      ...editedPredictionData,
                      tip: e.target.value,
                    })}
                  />
                ) : (
                  prediction.tip
                )}
              </td>
              <td>
                {editPredictionId === prediction.id ? (
                  <input
                    type="text"
                    value={editedPredictionData.result}
                    onChange={(e) => setEditedPredictionData({
                      ...editedPredictionData,
                      result: e.target.value,
                    })}
                  />
                ) : (
                  prediction.result
                )}
              </td>
              <td>
                {editPredictionId === prediction.id ? (
                  <>
                    <button type="button" onClick={handleSaveEdit}>Save</button>
                    <button id="btn-bg-red" type="button" onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => handleEdit(prediction)}>Edit</button>
                    <button id="btn-bg-red" type="button" onClick={() => handleDelete(prediction.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-data">
        <h2>Add a New Prediction</h2>
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={newPredictionData.date}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="time"
          placeholder="Time"
          value={newPredictionData.time}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="league"
          placeholder="League"
          value={newPredictionData.league}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="home_team_logo"
          placeholder="Home Team Logo"
          value={newPredictionData.home_team_logo}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="away_team_logo"
          placeholder="Away Team Logo"
          value={newPredictionData.away_team_logo}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="home_team"
          placeholder="Home Team"
          value={newPredictionData.home_team}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="away_team"
          placeholder="Away Team"
          value={newPredictionData.away_team}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="tip"
          placeholder="Tip"
          value={newPredictionData.tip}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="result"
          placeholder="Results"
          value={newPredictionData.result}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleAddPrediction}>Add Prediction</button>
      </div>
    </div>
  );
};

export default PredictionsPanel;
