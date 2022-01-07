import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './views/Dashboard/Dashboard';
import Login from './views/Login/Login';
import Settings from './views/Settings/Settings';
import Characters from './views/Characters/Characters';
import useToken from './components/App/useToken';
import useAccountName from './components/App/useAccountName';

// TODO: Consider moving this
async function getAccountDetails(accountName, token) {
  const response = await axios.get(`http://localhost:8080/accounts/${accountName}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
}

function App() {
  const { token, setToken } = useToken();
  const {accountName, setAccountName} = useAccountName();
  const [account, setAccount] = useState();

  useEffect(() => {
    if (accountName && !account) {
      getAccountDetails(accountName, token)
        .then((fullAccount) => {
          setAccount(fullAccount);
        });
    }
  });

  if (!token) {
    return <Login setToken={setToken} setAccountName={setAccountName} />;
  }

  return (
    <div className="wrapper">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'wrapper'}>
      </Sidebar>
      <div id="page-wrap">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard account={account} />} />
            <Route path="/settings" element={<Settings account={account} />} />
            <Route path="/characters" element={<Characters account={account} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
