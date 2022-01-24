//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import loginCharacter from './loginCharacter';

describe('loginCharacter', () => {
  test('returns the expected command', () => {
    const command = loginCharacter('', { characterId: 'foo' });
    expect(command).toBeDefined();
    expect(command.messageType).toEqual('LoginCharacter');
    expect(command.characterId).toEqual('foo');
  });
});

