//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import './Characters.css';

import CharacterDisplay from '../../components/CharacterDisplay/CharacterDisplay';
import CharacterCreation from '../../components/CharacterCreation/CharacterCreation';
import { getAccountDetails, getAllCharacterDetails } from '../../utils/restAPI';

export default function Characters({ account }) {
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
      <CharacterDisplay key={character.id} character={ character } />
    );
  })

  const onCharacterCreated = async (character) => {
    // For now, do nothing with the new character?
    account = await getAccountDetails(account.accountName);
    const results = await getAllCharacterDetails(account);
    setCharacters(results);
  };

  if (!account) {
    return <div></div>;
  }

  return (
    <React.Fragment>
      <div className="header">
        <h2>Characters</h2>
      </div>
      <div className="main-pane">
        {characterElements}
        <CharacterCreation key="internal-character-creation" account={ account } onSuccess={ onCharacterCreated } />
      </div>
    </React.Fragment>
  );
}
