
const loginCharacter = (textOptions, options) => {
  return {
    messageType: 'LoginCharacter',
    characterId: options.characterId,
  };
};

export default loginCharacter;