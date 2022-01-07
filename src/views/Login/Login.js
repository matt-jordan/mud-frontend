import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login.css';

import { login, createAccount } from '../../utils/restAPI';

export default function Login({ setToken, setAccountName }) {
  const [accountName, setAccountNameLocal] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [formState, setFormState] = useState('login');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (formState === 'create-account') {
        await createAccount({ accountName, password, email });
      }
      const { sessionId } = await login(accountName, password);
      setToken(sessionId);
      setAccountName(accountName);
    } catch (error) {
      setError(error.message);
    }
  }

  const handleToggle = () => {
    setFormState(formState === 'login' ? 'create-account' : 'login');
  }

  return (
    <div className="login-wrapper">
      <h1>Please Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Account Name</p>
          <input aria-label="Account Name" type="text" onChange={ e => setAccountNameLocal(e.target.value) }/>
        </label>
        <label>
          <p>Password</p>
          <input aria-label="Password" type="password" onChange={ e=> setPassword(e.target.value) }/>
        </label>
        {formState === 'login' ? null :
          <label>
            <p>E-Mail</p>
            <input aria-label="E-Mail" type="text" onChange={ e => setEmail(e.target.value) }/>
          </label>
        }
        <div>
          <button type="submit">Submit</button>
        </div>
        <div>
          <button type="button" onClick={handleToggle}>{formState === 'login' ? 'Create Account' : 'Login'}</button>
        </div>
        {error ? <div>
          <label aria-label="Error">{error}</label>
        </div>: null}
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setAccountName: PropTypes.func.isRequired,
};