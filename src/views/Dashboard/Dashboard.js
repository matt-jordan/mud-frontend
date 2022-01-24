//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Dashboard.css';

import CharacterGameWindow from '../../components/CharacterGameWindow/CharacterGameWindow';
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

  const characterElements = characters.map((character) => {
    return (
      <CharacterGameWindow key={character.id} character={ character } />
    );
  })

  return (
    <React.Fragment>
      <div className="header">
        <h2>Main</h2>
      </div>
      <div className="main-pane">
        {characterElements}
      </div>
    </React.Fragment>
  );
}

Dashboard.propTypes = {
  account: PropTypes.object,
};