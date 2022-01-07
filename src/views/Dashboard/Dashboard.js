import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Dashboard.css';

import { getAllCharacterDetails } from '../../utils/restAPI';

export default function Dashboard({ account }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if (account) {
      const wrapper = async () => {
        const results = await getAllCharacterDetails(account);
        setCharacters(results);
      };
      wrapper();
    }
  }, [account]);

  return (
    <div className="dashboard">
      <div className="main-pane">
        <h2>Main</h2>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  account: PropTypes.object,
};