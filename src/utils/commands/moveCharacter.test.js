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

