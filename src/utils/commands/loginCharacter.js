//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

const loginCharacter = (textOptions, options) => {
  return {
    messageType: 'LoginCharacter',
    characterId: options.characterId,
  };
};

export default loginCharacter;