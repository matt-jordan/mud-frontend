import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './login.css';

// ToDo: Move this to a set of functions and/or elsewhere. Or something.
async function loginUser(credentials) {
  const response = await axios.post('http://localhost:8080/login', credentials);

  return response.data.sessionId;
}

async function createAccount(params) {
  const { accountName, email, password } = params;

  const response = await axios.post(
    `http://localhost:8080/accounts/${accountName}`,
    { email, password });

  return response;
}

export default function Login({ setToken }) {
  const [accountName, setAccountName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [formState, setFormState] = useState('login');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (formState === 'create-account') {
        await createAccount({
          accountName,
          password,
          email,
        });
      }
      const token = await loginUser({
        accountName,
        password
      });
      setToken(token);
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
          <input aria-label="Account Name" type="text" onChange={ e => setAccountName(e.target.value) }/>
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
};