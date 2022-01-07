import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Dashboard.css';

import { getAccountDetails } from '../../utils/restAPI';

export default function Dashboard({ accountName }) {
  const [account, setAccount] = useState();

  useEffect(() => {
    if (accountName) {
      getAccountDetails(accountName)
        .then((fullAccount) => {
          setAccount(fullAccount);
        });
    }
  });

  return (
    <div className="dashboard">
      <div className="main-pane">
        <h2>Main</h2>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  accountName: PropTypes.string,
};