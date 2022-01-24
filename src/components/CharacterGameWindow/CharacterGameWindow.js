//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './CharacterGameWindow.css'

import { buildCommand } from '../../utils/commands/commands';
import Message from '../Message/Message';

export default function CharacterGameWindow({ character }) {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');
  const messagesEndRef = useRef(null);
  let ws = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (ws && !ws.current) {
      ws.current = new window.WebSocket('ws://localhost:8080');
      ws.current.addEventListener('open', () => {
        const loginCommand = buildCommand('login', { characterId: character.id });

        ws.current.send(loginCommand);
      });
      ws.current.addEventListener('close', (e) => {
        console.log({e}, 'connection closed');
      });
      ws.current.addEventListener('message', (e) => {
        const jsonMessage = JSON.parse(e.data);
        switch(jsonMessage.messageType) {
          case 'RoomDetails':
          case 'TextMessage':
            messages.push(jsonMessage);
            setMessages([...messages]);
            scrollToBottom();
          break;
          default:
            console.warn('Unknown message type: ', e);
        }
      });
    }

    return () => { ws.current = null; };
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      ws.current.send(buildCommand(textInput, { characterId: character.id }));
    } catch (error) {
      console.log(error);
    }
    setTextInput('');
  };

  const handleTextInputChange = async e => {
    setTextInput(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="character-panel">
        <div className="character-panel-information" aria-label="Character Name">
          <p>Name: {character.name}</p>
        </div>
        <div className="message-area">
          {messages.map((jsonMessage, i) => {
            return <Message key={i} jsonMessage={jsonMessage} />
          })}
          <div ref={messagesEndRef}>
          </div>
        </div>
        <div>
          <form id="input-form" onSubmit={handleSubmit}>
            <div className="input-area">
              <input type="text" value={textInput} onChange={handleTextInputChange}/>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

CharacterGameWindow.propTypes = {
  character: PropTypes.object.isRequired,
};
