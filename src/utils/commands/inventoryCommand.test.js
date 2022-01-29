//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import inventoryCommand from './inventoryCommand';

describe('inventoryCommand', () => {
  test('returns the expected command', () => {
    const command = inventoryCommand('', { characterId: 'foo' });
    expect(command).toBeDefined();
    expect(command.messageType).toEqual('Inventory');
    expect(command.characterId).toEqual('foo');
  });
});

