
const moveCharacter = (textOptions, options) => {
  return {
    messageType: 'MoveCharacter',
    parameters: textOptions,
    characterId: options.characterId,
  };
};

export default moveCharacter;