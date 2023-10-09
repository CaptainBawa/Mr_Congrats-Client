import React from 'react';
import { Link } from 'react-router-dom';

const Note = () => (
  <div className="not-subscriber">
    <p>
      You are not a VIP member,
      {' '}
      <Link to="/order">subscribe</Link>
      {' '}
      to become a VIP
      member in other to see our paid combos.
    </p>
  </div>
);

export default Note;
