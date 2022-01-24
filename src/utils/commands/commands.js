//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import loginCharacter from './loginCharacter';
import lookCommand from './lookCommand';
import moveCharacter from './moveCharacter';

const commandRegistry = {
  'login': loginCharacter,
  'look': lookCommand,
  'move': moveCharacter,
};

let authHeader = {};

// NOTE: We are explicitly not trying to figure out command sets just yet here.
// We could use an authorization token to tell us what command sets they're
// allowed to use, but we'll have to tinker with the AuthN model. For now,
// going to hold off on all of that.
//
// We will need to handle that server side.

function buildCommand(text, options) {
  let command;
  try {
    const tokens = text.split(' ');
    if (tokens.length === 0) {
      throw new CommandException('Command length cannot be 0');
    }
    command = tokens[0];
    tokens.shift();

    if (!(command in commandRegistry)) {
      throw new CommandException(`Unknown command: ${command}`, command);
    }

    const output = commandRegistry[command](tokens, options);

    return JSON.stringify({
      ...authHeader,
      ...output,
    });
  } catch (e) {
    if (e instanceof CommandException) {
      throw e;
    }
    throw CommandException(`Error handling command: ${e.message}`, command || 'Unknown');
  }
}

function initCommands(token) {
  authHeader = { auth: token };
}

class CommandException extends Error {
  constructor(message, command) {
    super(message);
    this.name = this.constructor.name;
    this.command = command;
  }
}

export {
  initCommands,
  buildCommand,
  CommandException
};