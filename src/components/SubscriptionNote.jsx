import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionNote = () => (
  <div>
    <p>
      <Link to="/signup">Sign up</Link>
      or
      <Link to="/login">Login</Link>
      to access our weekly plan
      and receive our 20 odds prediction for just 20usd.
      Join Now!
    </p>
  </div>
);

export default SubscriptionNote;
