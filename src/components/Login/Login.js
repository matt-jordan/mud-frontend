import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './login.css';

// ToDo: Move this to a set of functions and/or elsewhere. Or something.
async function loginUser(credentials) {
  const response = await axios.post('http://localhost:8080/login', credentials);

  return response.data.sessionId;
}

export default function Login({ setToken }) {
  const [accountName, setAccountName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = await loginUser({
        accountName,
        password
      });
      setToken(token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="login-wrapper">
      <h1>Please Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Account Name</p>
          <input type="text" onChange={ e => setAccountName(e.target.value) }/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={ e=> setPassword(e.target.value) }/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        {error ? <div>
          <label>{error}</label>
        </div>: null}
      </form>
    </div>
  );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};