//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAccountDetails } from './utils/restAPI';

import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './views/Dashboard/Dashboard';
import Login from './views/Login/Login';
import Settings from './views/Settings/Settings';
import Characters from './views/Characters/Characters';
import useToken from './components/App/useToken';
import useAccountName from './components/App/useAccountName';

function App() {
  const { token, setToken } = useToken();
  const {accountName, setAccountName} = useAccountName();
  const [account, setAccount] = useState();

  useEffect(() => {
    if (accountName && !account) {
      getAccountDetails(accountName)
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
