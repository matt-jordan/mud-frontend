import React from 'react';
import './Sidebar.css';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a id="home" className="menu-item" href="/">Home</a>
      <a id="characters" className="menu-item" href="/characters">Characters</a>
      <a id="settings" className="menu-item" href="/settings">Settings</a>
    </Menu>
  );
};
