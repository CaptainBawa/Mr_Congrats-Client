import React from 'react';
import { Link } from 'react-router-dom';

const Order = () => (
  <div className="order-card">
    <Link to="/">&larr;</Link>
    <h1>Order this package</h1>
    <p>
      This package will give you access to our premium and
      sure combo for a week. After subscribing to this package,
      you can see the matches available on our premium combo table.
    </p>
    <p>
      Please send a screenshot of your payment to our whatsapp
      number (+233551740326) for verification and confirmation of your payment
      in other to get access to our premium tips.
    </p>
    <div className="payment-container">
      <h3>Pay with</h3>
      <div className="payment-options">
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHTqh0HUCekjsP9QvzwKWwKLHBuG4ZQcaMZg&usqp=CAU" alt="MTN MoMo logo" />
          <h3>Ankomah Prince: +233551740326</h3>
        </div>
        <div>
          <img src="data:image/png;base64,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" alt="bank logo" />
          <h3>
            Accoint Number: 1441002699576 Account
            Name: Ankomah Prince Branch: Okponglo Branch Ecobank
          </h3>
        </div>
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJAAJQPzs3FtcfQEtWWvgehuKtYwBtY5w-JQ&usqp=CAU" alt="bitcoin logo" />
          <h3>3BbGofMh5Z3b4mYe51zPdoJp7ktGRanbqu</h3>
        </div>
      </div>
    </div>
  </div>
);

export default Order;
