//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import { useState } from 'react';

export default function useAccountName() {
  const getAccountName = () => {
    const accountNameString = sessionStorage.getItem('accountName');
    const accountToken = JSON.parse(accountNameString);
    return accountToken;
  };

  const saveAccountName = (accountName) => {
    sessionStorage.setItem('accountName', JSON.stringify(accountName));
    setAccountName(accountName);
  };

  const [accountName, setAccountName] = useState(getAccountName());

  return {
    setAccountName: saveAccountName,
    accountName,
  };
}