//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import textCommand from './textCommand';

describe('textCommand', () => {
  test('returns the expected command', () => {
    const command = textCommand('move', ['north'], { characterId: 'foo' });
    expect(command).toBeDefined();
    expect(command.messageType).toEqual('move');
    expect(command.parameters[0]).toEqual('north');
    expect(command.characterId).toEqual('foo');
  });
});

