//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CharacterGameInfo.css'

export default function CharacterGameInfo({ character, connected }) {
  const [hitpoints, setHitpoints] = useState({ current: 0, base: 0 });
  const [manapoints, setManapoints] = useState({ current: 0, base: 0 });
  const [energypoints, setEnergypoints] = useState({ current: 0, base: 0 });

  if (character.attributes.hitpoints.current !== hitpoints.current ||
    character.attributes.hitpoints.base !== hitpoints.base) {
    setHitpoints({
      current: character.attributes.hitpoints.current,
      base: character.attributes.hitpoints.base,
    });
  }

  if (character.attributes.manapoints.current !== manapoints.current ||
    character.attributes.manapoints.base !== manapoints.base) {
    setManapoints({
      current: character.attributes.manapoints.current,
      base: character.attributes.manapoints.base,
    });
  }

  if (character.attributes.energypoints.current !== energypoints.current ||
    character.attributes.energypoints.base !== energypoints.base) {
    setEnergypoints({
      current: character.attributes.energypoints.current,
      base: character.attributes.energypoints.base,
    });
  }

  return (<React.Fragment>
    <div className='character-game-info-container'>
      <div className='character-game-info-name'>{character.name}</div>
      <div className='character-game-info-hitpoints'>[{hitpoints.current}/{hitpoints.base}]</div>
      <div className='character-game-info-manapoints'>[{manapoints.current}/{manapoints.base}]</div>
      <div className='character-game-info-energypoints'>[{energypoints.current}/{energypoints.base}]</div>
      <div className={connected ? 'character-game-info-connected-y' : 'character-game-info-connected-n'}>{connected ? 'Y' : 'N'}</div>
    </div>
  </React.Fragment>);
}

CharacterGameInfo.propTypes = {
  character: PropTypes.object.isRequired,
  connected: PropTypes.bool,
};

