//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import { useState } from 'react';

import { initAPI } from '../../utils/restAPI';
import { initCommands } from '../../utils/commands/commands';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const accountToken = JSON.parse(tokenString);

    initAPI(accountToken);
    initCommands(accountToken);
    return accountToken;
  };

  const saveToken = (accountToken) => {
    sessionStorage.setItem('token', JSON.stringify(accountToken));

    initAPI(accountToken);
    initCommands(accountToken);
    setToken(accountToken);
  };

  const [token, setToken] = useState(getToken());

  return {
    setToken: saveToken,
    token,
  };
}