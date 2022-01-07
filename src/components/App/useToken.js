import { useState } from 'react';

import { initAPI } from '../../utils/restAPI';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const accountToken = JSON.parse(tokenString);

    initAPI(accountToken);
    return accountToken;
  };

  const saveToken = (accountToken) => {
    sessionStorage.setItem('token', JSON.stringify(accountToken));

    initAPI(accountToken);
    setToken(accountToken);
  };

  const [token, setToken] = useState(getToken());

  return {
    setToken: saveToken,
    token,
  };
}