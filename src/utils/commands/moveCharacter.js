
const moveCharacter = (textOptions, options) => {
  return {
    messageType: 'Move',
    parameters: textOptions,
    characterId: options.characterId,
  };
};

export default moveCharacter;