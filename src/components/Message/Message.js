//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Message.css'

export default function Message({ jsonMessage }) {

  // Do something based on message type
  let element;
  switch (jsonMessage.messageType) {
    case 'RoomDetails':
      const exits = jsonMessage.exits.map((exit) => {
        if (exit.door) {
          return `${!exit.door.isOpen ? '[' : ''}${exit.direction}${!exit.door.isOpen ? ']' : ''} (${exit.door.name})`;
        } else {
          return exit.direction;
        }
      }).join(', ');
      const characters = jsonMessage.characters.map((character) => `  ${character.summary}`).join('\n');
      const inanimates = jsonMessage.inanimates.map((inanimate) => `  ${inanimate.summary}`).join('\n');
      element = (
        <div className='message-room-details'>
          <div className='message-room-details-summary'>{jsonMessage.summary}</div>
          <div className='message-room-details-description'>{jsonMessage.description}</div>
          <div className='message-room-details-exits'>Exits: {jsonMessage.exits.length === 0 ? 'None' : exits}</div>
          {jsonMessage.inanimates.length !== 0 ? <div className='message-room-details-inanimates'>{`Objects:\n${inanimates}`}</div> : null }
          {jsonMessage.characters.length !== 0 ? <div className='message-room-details-characters'>{`Characters:\n${characters}`}</div> : null }
        </div>
        );
    break;
    case 'CombatMessage':
      element = <div className='combat-text'>{jsonMessage.message}</div>;
    break;
    case 'PartyStatus':
      const message = jsonMessage.message;
      const summary = `${message.leader.name}'s Party (${message.size}/${message.maxSize})\n`;
      const leader = ` * ${message.leader.name}: L${message.leader.classes[0].level} ${message.leader.classes[0].type} [${message.leader.classes[0].experience}/${message.leader.classes[0].maxExperience}]\n`;
      const members = message.members.map((member) => ` - ${member.name}: L${member.classes[0].level} ${member.classes[0].type} [${member.classes[0].experience}/${member.classes[0].maxExperience}]`).join('\n');
      element = <div className='party-text'>{summary}{leader}{members}</div>;
    break;
    case 'TextMessage':
      element = <div className='message-text'>{jsonMessage.message}</div>;
    break;
    case 'SystemMessage':
      element = <div className='system-message-text'>{jsonMessage.message}</div>;
    break;
    default:
      element = <div></div>;
  }

  return (<React.Fragment>{element}</React.Fragment>);
}

Message.propTypes = {
  jsonMessage: PropTypes.object.isRequired,
};

