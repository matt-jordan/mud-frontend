//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import { render, fireEvent, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import axios from 'axios';

import Login from './Login';

jest.mock('axios');

describe('when logging in', () => {
  test('renders basic fields', () => {
    render(<Login setToken={() => { }} setAccountName={() => { }}/>);

    const accountNameElement = screen.getByText(/Account Name/);
    expect(accountNameElement).toBeInTheDocument();

    const passwordElement = screen.getByText(/Password/);
    expect(passwordElement).toBeInTheDocument();

    const submitElement = screen.getByText(/Submit/);
    expect(submitElement).toBeInTheDocument();

    const accountCreateButton = screen.getByText(/Create Account/);
    expect(accountCreateButton).toBeInTheDocument();
  });

  test('it switches to account creation mode when the create account button is pressed', () => {
    render(<Login setToken={() => { }} setAccountName={() => { }}/>);

    const accountCreateButton = screen.getByText(/Create Account/);
    expect(accountCreateButton).toBeInTheDocument();

    fireEvent.click(accountCreateButton);

    const accountNameElement = screen.getByText(/Account Name/);
    expect(accountNameElement).toBeInTheDocument();

    const emailElement = screen.getByText(/E-Mail/);
    expect(emailElement).toBeInTheDocument();

    const passwordElement = screen.getByText(/Password/);
    expect(passwordElement).toBeInTheDocument();

    const submitElement = screen.getByText(/Submit/);
    expect(submitElement).toBeInTheDocument();

    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
  });

  test('it attempts to login when the submit button is pressed and sets the token', async () => {
    let actualToken;
    let actualAccountName;

    render(<Login setAccountName={(accountName) => {
      actualAccountName = accountName;
    }} setToken={(token) => {
      actualToken = token;
    }}/>);

    axios.post.mockResolvedValueOnce({
      data: {
        sessionId: 'foobar',
      }
    });

    const accountInput = screen.getByLabelText(/Account Name/);
    fireEvent.change(accountInput, {target: {value: 'foo'}});

    const passwordInput = screen.getByLabelText(/Password/);
    fireEvent.change(passwordInput, {target: {value: 'bar'}});

    const submitButton = screen.getByText(/Submit/);
    // This is necessary as it fires an async event that would otherwise
    // be unhandled without act.
    await act(async () => fireEvent.click(submitButton));

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/login', {
      accountName: 'foo',
      password: 'bar',
    });
    expect(actualToken).toEqual('foobar');
    expect(actualAccountName).toEqual('foo');
  });

  test('it displays an error if the server fails to login', async () => {
    let actualToken;
    let actualAccountName;

    render(<Login setAccountName={(accountName) => {
      actualAccountName = accountName;
    }} setToken={(token) => {
      actualToken = token;
    }}/>);

    axios.post.mockRejectedValueOnce(new Error('foobar'));

    const accountInput = screen.getByLabelText(/Account Name/);
    fireEvent.change(accountInput, {target: {value: 'foo'}});

    const passwordInput = screen.getByLabelText(/Password/);
    fireEvent.change(passwordInput, {target: {value: 'bar'}});

    const submitButton = screen.getByText(/Submit/);
    // This is necessary as it fires an async event that would otherwise
    // be unhandled without act.
    await act(async () => fireEvent.click(submitButton));

    const errorLabel = screen.getByLabelText(/Error/);
    expect(errorLabel).toBeInTheDocument();
    expect(errorLabel.textContent).toEqual('foobar');

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/login', {
      accountName: 'foo',
      password: 'bar',
    });
    expect(actualToken).toBeUndefined();
    expect(actualAccountName).toBeUndefined();
  });
});

describe('when creating the account', () => {
  let actualToken;
  let actualAccountName;

  function preTestSetup() {
    render(<Login setAccountName={(accountName) => {
      actualAccountName = accountName;
    }} setToken={(token) => {
      actualToken = token;
    }}/>);
    const accountCreateButton = screen.getByText(/Create Account/);
    fireEvent.click(accountCreateButton);
  }

  afterEach(() => {
    actualToken = null;
  });

  test('it displays an error when account creation fails', async () => {
    preTestSetup();

    axios.post.mockRejectedValueOnce(new Error('foobar'));

    const accountInput = screen.getByLabelText(/Account Name/);
    fireEvent.change(accountInput, {target: {value: 'foo'}});

    const emailInput = screen.getByLabelText(/E-Mail/);
    fireEvent.change(emailInput, {target: {value: 'foo@foo.com'}});

    const passwordInput = screen.getByLabelText(/Password/);
    fireEvent.change(passwordInput, {target: {value: 'bar'}});

    const submitButton = screen.getByText(/Submit/);
    // This is necessary as it fires an async event that would otherwise
    // be unhandled without act.
    await act(async () => fireEvent.click(submitButton));

    const errorLabel = screen.getByLabelText(/Error/);
    expect(errorLabel).toBeInTheDocument();
    expect(errorLabel.textContent).toEqual('foobar');

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/accounts/foo', {
      password: 'bar',
      email: 'foo@foo.com',
    });
    expect(actualToken).toBeUndefined();
  });

  test('it attempts to create the account and login', async () => {
    preTestSetup();

    axios.post.mockImplementation((url, data) => {
      switch (url) {
        case 'http://localhost:8080/login':
          return Promise.resolve({
            data: {
              sessionId: 'session',
              accountName: 'foo',
            }
          });
        case 'http://localhost:8080/accounts/foo':
          return Promise.resolve({
            data: {
              accountName: 'foo',
            }
          });
        default:
          return Promise.reject(new Error('Error'));
      }
    });

    const accountInput = screen.getByLabelText(/Account Name/);
    fireEvent.change(accountInput, {target: {value: 'foo'}});

    const emailInput = screen.getByLabelText(/E-Mail/);
    fireEvent.change(emailInput, {target: {value: 'foo@foo.com'}});

    const passwordInput = screen.getByLabelText(/Password/);
    fireEvent.change(passwordInput, {target: {value: 'bar'}});

    const submitButton = screen.getByText(/Submit/);
    // This is necessary as it fires an async event that would otherwise
    // be unhandled without act.
    await act(async () => fireEvent.click(submitButton));

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/accounts/foo', {
      password: 'bar',
      email: 'foo@foo.com',
    });
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/login', {
      accountName: 'foo',
      password: 'bar',
    });
    expect(actualToken).toEqual('session');
    expect(actualAccountName).toEqual('foo');
  });
});