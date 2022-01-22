
const lookCommand = (textOptions, options) => {
  return {
    messageType: 'Look',
    parameters: textOptions,
    characterId: options.characterId,
  };
};

export default lookCommand;