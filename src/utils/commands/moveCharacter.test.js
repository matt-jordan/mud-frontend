//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import moveCharacter from './moveCharacter';

describe('moveCharacter', () => {
  test('returns the expected command', () => {
    const command = moveCharacter(['north'], { characterId: 'foo' });
    expect(command).toBeDefined();
    expect(command.messageType).toEqual('Move');
    expect(command.parameters.length).toEqual(1);
    expect(command.characterId).toEqual('foo');
  });
});

