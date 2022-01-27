//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import './CharacterDisplay.css'

export default function CharacterDisplay({ character }) {

  return <div className="character-display-panel">
      <label aria-label="Character Name">
        <p>Name: {character.name}</p>
      </label>
      <label aria-label="Age">
        <p>Age: {character.age}</p>
      </label>
      <label aria-label="Gender">
        <p>Gender: {character.gender}</p>
      </label>
      <label aria-label="Description">
        <p>Description: {character.description}</p>
      </label>
      <label aria-label="Class">
        <p>Class: {character.classes[0].type} (Level {character.classes[0].level})</p>
      </label>
      <label aria-label="Attributes">
        <p>Strength: {character.attributes.stength}</p>
        <p>Dexterity: {character.attributes.dexteriy}</p>
        <p>Consitution: {character.attributes.constitution}</p>
        <p>Intelligence: {character.attributes.intelligence}</p>
        <p>Wisdom: {character.attributes.wisdom}</p>
        <p>Charisma: {character.attributes.charisma}</p>
        <p>HP: {character.attributes.hitpoints.base} | MP: {character.attributes.manapoints.base} | EP: {character.attributes.energypoints.base}</p>
      </label>
    </div>;
}

CharacterDisplay.propTypes = {
  character: PropTypes.object.isRequired,
};

