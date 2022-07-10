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
import CharacterGameInfo from '../CharacterGameInfo/CharacterGameInfo';

export default function CharacterGameWindow({ character }) {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [characterDetails, setCharacterDetails] = useState(character);
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef(null);
  let ws = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const server = `${process.env.REACT_APP_SERVER_URI ?? 'localhost'}`;
  const port = `${process.env.REACT_APP_PORT ?? '8080'}`;

  useEffect(() => {
    if (!connected) {
      let handle;

      const tryConnection = () => {
        messages.push({ messageType: 'SystemMessage', message: 'Connecting to server...'});
        setMessages([...messages]);
        scrollToBottom();

        ws.current = new window.WebSocket(`ws://${server}:${port}`);
        ws.current.addEventListener('open', () => {
          setConnected(true);
          const loginCommand = buildCommand('login', { characterId: character.id });
          ws.current.send(loginCommand);
          if (handle) {
            clearTimeout(handle);
          }
        });
        ws.current.addEventListener('close', (e) => {
          messages.push({ messageType: 'SystemMessage', message: 'Connection to server closed.' });
          setMessages([...messages]);
          scrollToBottom();
          setConnected(false);
          handle = setTimeout(tryConnection, 5000);
        });
        ws.current.addEventListener('message', (e) => {
          const jsonMessage = JSON.parse(e.data);
          switch(jsonMessage.messageType) {
            case 'RoomDetails':
            case 'TextMessage':
            case 'CombatMessage':
              messages.push(jsonMessage);
              setMessages([...messages]);
              scrollToBottom();
            break;
            case 'CharacterDetails':
              setCharacterDetails(jsonMessage.character);
            break;
            default:
              console.warn('Unknown message type: ', e);
          }
        });
      };
      tryConnection();
    }

    return () => {
      setConnected(false);
      ws.current = null;
    };
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!ws.current || ws.current.readyState !== 1) {
      setTextInput('');
      messages.push({ messageType: 'SystemMessage', message: 'Not connected to server'});
      setMessages([...messages]);
      scrollToBottom();
      return;
    }

    try {
      ws.current.send(buildCommand(textInput, { characterId: character.id }));
    } catch (error) {
      console.error(error);
    }
    setTextInput('');
  };

  const handleTextInputChange = async e => {
    setTextInput(e.target.value);
  };

  return (
    <div className="character-panel">
      <CharacterGameInfo character={characterDetails} connected={connected} />
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
  );
}

CharacterGameWindow.propTypes = {
  character: PropTypes.object.isRequired,
};
