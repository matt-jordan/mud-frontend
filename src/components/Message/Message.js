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

export default function Message({ message }) {
  const jsonMessage = JSON.parse(message.data);

  // Do something based on message type

  return (<React.Fragment>
  	<div className='message-text'>{jsonMessage.message}</div>
  </React.Fragment>);
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

