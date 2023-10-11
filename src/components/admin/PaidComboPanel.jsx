import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createPaidCombo,
  deletePaidCombo,
  updatePaidCombo,
} from '../../redux/slice/paidCombosSlice';

const PaidComboPanel = () => {
  const dispatch = useDispatch();
  const paidCombos = useSelector((state) => state.paidCombos?.paidCombos);
  const status = useSelector((state) => state.freeCombos?.status);
  const error = useSelector(((state) => state.freeCombos?.error));
  const user = useSelector((state) => state.auth.user?.data?.id);

  const [editPaidComboId, setEditPaidComboId] = useState(null);
  const [editedPaidComboData, setEditedPaidComboData] = useState({});
  const [newPaidComboData, setNewPaidComboData] = useState({
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

  const handlePaidComboEdit = (paidCombo) => {
    setEditPaidComboId(paidCombo.id);
    setEditedPaidComboData(paidCombo);
  };

  const handlePaidComboCancelEdit = () => {
    setEditPaidComboId(null);
    setEditedPaidComboData({});
  };

  const handlePaidComboSaveEdit = () => {
    dispatch(updatePaidCombo({ paid_combo: editedPaidComboData, id: editPaidComboId }))
      .then(() => {
        setEditPaidComboId(null);
        setEditedPaidComboData({});
      })
      .catch((error) => {
        throw new Error('Failed to update Paid combo:', error);
      });
  };

  const handlePaidComboDelete = (id) => {
    dispatch(deletePaidCombo(id))
      .catch((error) => {
        throw new Error('Failed to delete Paid combo:', error);
      });
  };

  const handlePaidComboInputChange = (e) => {
    const { name, value } = e.target;
    setNewPaidComboData({ ...newPaidComboData, [name]: value });
  };

  const handleAddPaidCombo = () => {
    dispatch(createPaidCombo({ paid_combo: newPaidComboData }))
      .then(() => {
        setNewPaidComboData({
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
      <h2>Piad Combos</h2>
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
          {paidCombos.map((paidCombo) => (
            <tr key={paidCombo.id}>
              <td>{paidCombo.id}</td>
              <td>
                {editPaidComboId === paidCombo.id ? (
                  <input
                    type="date"
                    value={editedPaidComboData.date}
                    onChange={(e) => setEditedPaidComboData({
                      ...editedPaidComboData,
                      date: e.target.value,
                    })}
                  />
                ) : (
                  paidCombo.date
                )}
              </td>
              <td>
                {editPaidComboId === paidCombo.id ? (
                  <input
                    type="text"
                    value={editedPaidComboData.time}
                    onChange={(e) => setEditedPaidComboData({
                      ...editedPaidComboData,
                      time: e.target.value,
                    })}
                  />
                ) : (
                  formatTime(paidCombo.time)
                )}
              </td>
              <td>
                {editPaidComboId === paidCombo.id ? (
                  <input
                    type="text"
                    value={editedPaidComboData.league}
                    onChange={(e) => setEditedPaidComboData({
                      ...editedPaidComboData,
                      league: e.target.value,
                    })}
                  />
                ) : (
                  paidCombo.league
                )}
              </td>
              <td>
                {editPaidComboId === paidCombo.id ? (
                  <input
                    type="text"
                    value={editedPaidComboData.home_team}
                    onChange={(e) => setEditedPaidComboData({
                      ...editedPaidComboData,
                      home_team: e.target.value,
                    })}
                  />
                ) : (
                  paidCombo.home_team
                )}
              </td>
              <td>
                {editPaidComboId === paidCombo.id ? (
                  <input
                    type="text"
                    name="homeTeam"
                    value={editedPaidComboData.away_team}
                    onChange={(e) => setEditedPaidComboData({
                      ...editedPaidComboData,
                      away_team: e.target.value,
                    })}
                  />
                ) : (
                  paidCombo.away_team
                )}
              </td>
              <td>
                {editPaidComboId === paidCombo.id ? (
                  <input
                    type="text"
                    value={editedPaidComboData.tip}
                    onChange={(e) => setEditedPaidComboData({
                      ...editedPaidComboData,
                      tip: e.target.value,
                    })}
                  />
                ) : (
                  paidCombo.tip
                )}
              </td>
              <td>
                {editPaidComboId === paidCombo.id ? (
                  <input
                    type="text"
                    value={editedPaidComboData.odd}
                    onChange={(e) => setEditedPaidComboData({
                      ...editedPaidComboData,
                      tip: e.target.value,
                    })}
                  />
                ) : (
                  paidCombo.odd
                )}
              </td>
              <td>
                {editPaidComboId === paidCombo.id ? (
                  <input
                    type="text"
                    value={editedPaidComboData.result}
                    onChange={(e) => setEditedPaidComboData({
                      ...editedPaidComboData,
                      result: e.target.value,
                    })}
                  />
                ) : (
                  paidCombo.result
                )}
              </td>
              <td>
                {editPaidComboId === paidCombo.id ? (
                  <>
                    <button type="button" onClick={handlePaidComboSaveEdit}>Save</button>
                    <button id="btn-bg-red" type="button" onClick={handlePaidComboCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => handlePaidComboEdit(paidCombo)}>Edit</button>
                    <button id="btn-bg-red" type="button" onClick={() => handlePaidComboDelete(paidCombo.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-data">
        <h2>Add a Paid Combo</h2>
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={newPaidComboData.date}
          onChange={handlePaidComboInputChange}
        />
        <input
          type="time"
          name="time"
          placeholder="Time"
          value={newPaidComboData.time}
          onChange={handlePaidComboInputChange}
        />
        <input
          type="text"
          name="league"
          placeholder="League"
          value={newPaidComboData.league}
          onChange={handlePaidComboInputChange}
        />
        <input
          type="text"
          name="home_team"
          placeholder="Home Team"
          value={newPaidComboData.home_team}
          onChange={handlePaidComboInputChange}
        />
        <input
          type="text"
          name="away_team"
          placeholder="Away Team"
          value={newPaidComboData.away_team}
          onChange={handlePaidComboInputChange}
        />
        <input
          type="text"
          name="tip"
          placeholder="Tip"
          value={newPaidComboData.tip}
          onChange={handlePaidComboInputChange}
        />
        <input
          type="text"
          name="odd"
          placeholder="Odd"
          value={newPaidComboData.odd}
          onChange={handlePaidComboInputChange}
        />
        <input
          type="text"
          name="result"
          placeholder="Results"
          value={newPaidComboData.result}
          onChange={handlePaidComboInputChange}
        />
        <button type="button" onClick={handleAddPaidCombo}>Add Paid Combo</button>
      </div>
    </div>
  );
};

export default PaidComboPanel;
