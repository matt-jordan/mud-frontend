import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const accountToken = JSON.parse(tokenString);
    return accountToken;
  };

  const saveToken = (accountToken) => {
    sessionStorage.setItem('token', JSON.stringify(accountToken));
    setToken(accountToken);
  };

  const [token, setToken] = useState(getToken());

  return {
    setToken: saveToken,
    token,
  };
}