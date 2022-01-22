import lookCommand from './lookCommand';

describe('lookCommand', () => {
  test('returns the expected command', () => {
    const command = lookCommand(['north'], { characterId: 'foo' });
    expect(command).toBeDefined();
    expect(command.messageType).toEqual('Look');
    expect(command.parameters.length).toEqual(1);
    expect(command.characterId).toEqual('foo');
  });
});

