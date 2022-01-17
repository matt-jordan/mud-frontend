import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './CharacterGameWindow.css'

import useToken from '../App/useToken';
import Message from '../Message/Message';

export default function CharacterGameWindow({ character }) {
  const { token } = useToken();
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState();
  let ws = useRef();

  useEffect(() => {
    if (ws && !ws.current) {
      ws.current = new window.WebSocket('ws://localhost:8080');
      ws.current.addEventListener('open', () => {
        ws.current.send(JSON.stringify({
          auth: token,
          messageType: 'LoginCharacter',
          characterId: `${character.id}`,
        }));
      });
      ws.current.addEventListener('close', (e) => {
        console.log({e}, 'connection closed');
      });
      ws.current.addEventListener('message', (e) => {
        messages.push(e);
        setMessages(messages);
      });
    }

    return () => { ws.current = null; };
  }, [character, token, messages]);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(ws.current);
    try {
      ws.current.send(JSON.stringify({
        auth: token,
        messageType: 'MoveCharacter',
        characterId: `${character.id}`,
        direction: textInput,
      }));
    } catch (error) {
    }
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
        <form onSubmit={handleSubmit}>
          <div className="input-area">
            <input type="text" placeholder="..." onChange={ e=> setTextInput(e.target.value) }/>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

CharacterGameWindow.propTypes = {
  character: PropTypes.object.isRequired,
};

