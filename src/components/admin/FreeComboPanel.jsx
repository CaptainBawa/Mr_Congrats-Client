import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFreeCombos,
  selectFreeCombosStatus,
  selectFreeCombosError,
  fetchFreeCombos,
  createFreeCombo,
  deleteFreeCombo,
  updateFreeCombo,
} from '../../redux/slice/freeCombosSlice';

const FreeComboPanel = () => {
  const dispatch = useDispatch();
  const freeCombos = useSelector(selectFreeCombos);
  const status = useSelector(selectFreeCombosStatus);
  const error = useSelector(selectFreeCombosError);
  const user = useSelector((state) => state.auth.user?.data?.id);

  const [editFreeComboId, setEditFreeComboId] = useState(null);
  const [editedFreeComboData, setEditedFreeComboData] = useState({});
  const [newFreeComboData, setNewFreeComboData] = useState({
    date: '',
    time: '',
    league: '',
    home_team: '',
    away_team: '',
    tip: '',
    odd: '',
    result: '',
    user_id: user,
  });

  useEffect(() => {
    dispatch(fetchFreeCombos());
  }, [status, dispatch]);

  const handleEdit = (freeCombo) => {
    setEditFreeComboId(freeCombo.id);
    setEditedFreeComboData(freeCombo);
  };

  const handleCancelEdit = () => {
    setEditFreeComboId(null);
    setEditedFreeComboData({});
  };

  const handleSaveEdit = () => {
    dispatch(updateFreeCombo({ free_combo: editedFreeComboData, id: editFreeComboId }))
      .then(() => {
        setEditFreeComboId(null);
        setEditedFreeComboData({});
      })
      .catch((error) => {
        throw new Error('Failed to update free combo:', error);
      });
  };

  const handleDelete = (id) => {
    dispatch(deleteFreeCombo(id))
      .catch((error) => {
        throw new Error('Failed to delete free combo:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFreeComboData({ ...newFreeComboData, [name]: value });
  };

  const handleAddFreeCombo = () => {
    dispatch(createFreeCombo({ free_combo: newFreeComboData }))
      .then(() => {
        setNewFreeComboData({
          date: '',
          time: '',
          league: '',
          home_team: '',
          away_team: '',
          tip: '',
          odd: '',
          result: '',
          user_id: user,
        });
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
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Tip</th>
            <th>Odd</th>
            <th>Results</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {freeCombos.map((freeCombo) => (
            <tr key={freeCombo.id}>
              <td>{freeCombo.id}</td>
              <td>
                {editFreeComboId === freeCombo.id ? (
                  <input
                    type="date"
                    value={editedFreeComboData.date}
                    onChange={(e) => setEditedFreeComboData({
                      ...editedFreeComboData,
                      date: e.target.value,
                    })}
                  />
                ) : (
                  freeCombo.date
                )}
              </td>
              <td>
                {editFreeComboId === freeCombo.id ? (
                  <input
                    type="text"
                    value={editedFreeComboData.time}
                    onChange={(e) => setEditedFreeComboData({
                      ...editedFreeComboData,
                      time: e.target.value,
                    })}
                  />
                ) : (
                  formatTime(freeCombo.time)
                )}
              </td>
              <td>
                {editFreeComboId === freeCombo.id ? (
                  <input
                    type="text"
                    value={editedFreeComboData.league}
                    onChange={(e) => setEditedFreeComboData({
                      ...editedFreeComboData,
                      league: e.target.value,
                    })}
                  />
                ) : (
                  freeCombo.league
                )}
              </td>
              <td>
                {editFreeComboId === freeCombo.id ? (
                  <input
                    type="text"
                    value={editedFreeComboData.home_team}
                    onChange={(e) => setEditedFreeComboData({
                      ...editedFreeComboData,
                      home_team: e.target.value,
                    })}
                  />
                ) : (
                  freeCombo.home_team
                )}
              </td>
              <td>
                {editFreeComboId === freeCombo.id ? (
                  <input
                    type="text"
                    name="homeTeam"
                    value={editedFreeComboData.away_team}
                    onChange={(e) => setEditedFreeComboData({
                      ...editedFreeComboData,
                      away_team: e.target.value,
                    })}
                  />
                ) : (
                  freeCombo.away_team
                )}
              </td>
              <td>
                {editFreeComboId === freeCombo.id ? (
                  <input
                    type="text"
                    value={editedFreeComboData.tip}
                    onChange={(e) => setEditedFreeComboData({
                      ...editedFreeComboData,
                      tip: e.target.value,
                    })}
                  />
                ) : (
                  freeCombo.tip
                )}
              </td>
              <td>
                {editFreeComboId === freeCombo.id ? (
                  <input
                    type="text"
                    value={editedFreeComboData.odd}
                    onChange={(e) => setEditedFreeComboData({
                      ...editedFreeComboData,
                      tip: e.target.value,
                    })}
                  />
                ) : (
                  freeCombo.odd
                )}
              </td>
              <td>
                {editFreeComboId === freeCombo.id ? (
                  <input
                    type="text"
                    value={editedFreeComboData.result}
                    onChange={(e) => setEditedFreeComboData({
                      ...editedFreeComboData,
                      result: e.target.value,
                    })}
                  />
                ) : (
                  freeCombo.result
                )}
              </td>
              <td>
                {editFreeComboId === freeCombo.id ? (
                  <>
                    <button type="button" onClick={handleSaveEdit}>Save</button>
                    <button id="btn-bg-red" type="button" onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => handleEdit(freeCombo)}>Edit</button>
                    <button id="btn-bg-red" type="button" onClick={() => handleDelete(freeCombo.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-data">
        <h2>Add a Free Combo</h2>
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={newFreeComboData.date}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="time"
          placeholder="Time"
          value={newFreeComboData.time}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="league"
          placeholder="League"
          value={newFreeComboData.league}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="home_team"
          placeholder="Home Team"
          value={newFreeComboData.home_team}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="away_team"
          placeholder="Away Team"
          value={newFreeComboData.away_team}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="tip"
          placeholder="Tip"
          value={newFreeComboData.tip}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="odd"
          placeholder="Odd"
          value={newFreeComboData.odd}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="result"
          placeholder="Results"
          value={newFreeComboData.result}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleAddFreeCombo}>Add Free Combo</button>
      </div>
    </div>
  );
};

export default FreeComboPanel;
