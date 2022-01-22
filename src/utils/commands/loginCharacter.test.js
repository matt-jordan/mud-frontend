import loginCharacter from './loginCharacter';

describe('loginCharacter', () => {
  test('returns the expected command', () => {
    const command = loginCharacter('', { characterId: 'foo' });
    expect(command).toBeDefined();
    expect(command.messageType).toEqual('LoginCharacter');
    expect(command.characterId).toEqual('foo');
  });
});

