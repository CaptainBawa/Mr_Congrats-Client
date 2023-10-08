import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  deleteUser,
  updateUser,
  selectUsers,
  selectUsersStatus,
  selectUsersError,
} from '../../redux/slice/usersSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);

  const [editUserId, setEditUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditedUserData(user);
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
    setEditedUserData({});
  };

  const handleSaveEdit = () => {
    dispatch(updateUser({ user: editedUserData, id: editUserId }))
      .then(() => {
        setEditUserId(null);
        setEditedUserData({});
      })
      .catch((error) => {
        throw new Error('Failed to update user:', error);
      });
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId))
      .catch((error) => {
        throw new Error('Failed to delete user:', error);
      });
  };

  const handleSubscriptionStatusChange = (value) => {
    setEditedUserData({
      ...editedUserData,
      subscription_status: value === 'Yes',
    });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {' '}
        {error}
      </div>
    );
  }

  return (
    <div className="admin-data">
      <h1>Admin Panel</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Subscription Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUserData.name}
                    onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUserData.email}
                    onChange={(e) => setEditedUserData({
                      ...editedUserData,
                      email: e.target.value,
                    })}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUserData.role}
                    onChange={(e) => setEditedUserData({
                      ...editedUserData,
                      role: e.target.value,
                    })}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <select
                    value={editedUserData.subscription_status ? 'Yes' : 'No'}
                    onChange={(e) => handleSubscriptionStatusChange(e.target.value)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                ) : (
                  <span>{user.subscription_status ? 'Yes' : 'No'}</span>
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <>
                    <button type="button" onClick={handleSaveEdit}>Save</button>
                    <button type="button" onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => handleEdit(user)}>Edit</button>
                    <button type="button" onClick={() => handleDelete(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
