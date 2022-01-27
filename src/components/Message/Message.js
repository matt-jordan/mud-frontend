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
      const exits = jsonMessage.exits.map((exit) => exit.direction).join(', ');
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
    case 'TextMessage':
      element = <div className='message-text'>{jsonMessage.message}</div>;
    break;
    default:
      element = <div></div>;
  }

  return (<React.Fragment>{element}</React.Fragment>);
}

Message.propTypes = {
  jsonMessage: PropTypes.object.isRequired,
};

