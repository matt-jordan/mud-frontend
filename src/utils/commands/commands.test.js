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