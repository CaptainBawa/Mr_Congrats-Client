import React from 'react';

const SideAds = () => {
  const ads = [
    {
      id: 1,
      image: 'https://betsites.ng/img/supabet-sports-betting-site.png',
      name: 'Supabet',
      name_link: 'https://supabets.com.gh/',
      type: 'Welcome bonus',
      button: 'https://supabets.com.gh/page/terms_cond',
      promo: 'https://supabets.com.gh/page/terms_cond',
      bonus: 'https://supabets.com.gh/page/terms_cond',
    },
    {
      id: 2,
      image: 'https://betsites.ng/img/supabet-sports-betting-site.png',
      name: 'Supabet',
      name_link: 'https://supabets.com.gh/',
      type: 'Welcome bonus',
      button: 'https://supabets.com.gh/page/terms_cond',
      promo: 'https://supabets.com.gh/page/terms_cond',
      bonus: 'https://supabets.com.gh/page/terms_cond',
    },
    {
      id: 3,
      image: 'https://betsites.ng/img/supabet-sports-betting-site.png',
      name: 'Supabet',
      name_link: 'https://supabets.com.gh/',
      type: 'Welcome bonus',
      button: 'https://supabets.com.gh/page/terms_cond',
      promo: 'https://supabets.com.gh/page/terms_cond',
      bonus: 'https://supabets.com.gh/page/terms_cond',
    },
    {
      id: 4,
      image: 'https://betsites.ng/img/supabet-sports-betting-site.png',
      name: 'Supabet',
      name_link: 'https://supabets.com.gh/',
      type: 'Welcome bonus',
      button: 'https://supabets.com.gh/page/terms_cond',
      promo: 'https://supabets.com.gh/page/terms_cond',
      bonus: 'https://supabets.com.gh/page/terms_cond',
    },
  ];

  return (
    <div className="side-ads-container">
      {ads.map((ad) => (
        <div className="side-ads" key={ad.id}>
          <div>
            <img src={ad.image} alt={ad.name} />
            <div className="link-type">
              <a target="_blank" rel="noreferrer" href={ad.name_link}>{ad.name}</a>
              <h3>{ad.type}</h3>
            </div>
          </div>
          <button type="button" className="ads-register">
            <a href={ad.button} target="_blank" rel="noreferrer" aria-label={`Register for ${ad.name}`}>
              Register
            </a>
          </button>
          <div className="pro-bonus-links">
            <a target="_blank" rel="noreferrer" href={ad.promo}>
              {ad.name}
              {' '}
              - Promo
            </a>
            <a target="_blank" rel="noreferrer" href={ad.bonus}>
              {ad.name}
              {' '}
              - Bonus
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideAds;
