//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import { buildCommand } from './commands';

describe('buildCommand', () => {
  ['login', 'look', 'move'].forEach((cmd) => {
    describe(`${cmd}`, () => {
      test('it builds the command', () => {
        const result = buildCommand(`${cmd} param1 param2`, { characterId: 'foo' });
        expect(result).toBeDefined();
        expect(result).toMatch(/messageType/);
      });
    });
  });

  test('unknown commands throw an exception', () => {
    expect(() => {
        buildCommand('foobar', null)
    }).toThrow();
  });

  test('no command throws an exception', () => {
    expect(() => {
        buildCommand()
    }).toThrow();
  });
});