import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './CharacterGameWindow.css'

import { buildCommand } from '../../utils/commands/commands';
import Message from '../Message/Message';

export default function CharacterGameWindow({ character }) {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState();
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
        messages.push(e);
        setMessages([...messages]);
        scrollToBottom();
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
    document.getElementById('input-form').reset();
  }

  return (
    <React.Fragment>
      <div className="character-panel">
        <label aria-label="Character Name">
          <p>Name: {character.name}</p>
        </label>
        <div className="message-area">
          {messages.map((message, i) => {
            return <Message key={i} message={message} />
          })}
        </div>
        <div ref={messagesEndRef}>
          <form id="input-form" onSubmit={handleSubmit}>
            <div className="input-area">
              <input type="text" placeholder="..." onChange={ e=> setTextInput(e.target.value) }/>
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

