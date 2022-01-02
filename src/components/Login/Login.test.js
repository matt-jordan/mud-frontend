import { render, fireEvent, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import axios from 'axios';

import Login from './Login';

jest.mock('axios');

test('renders basic fields', () => {
  render(<Login setToken={() => { }}/>);

  const accountNameElement = screen.getByText(/Account Name/);
  expect(accountNameElement).toBeInTheDocument();

  const passwordElement = screen.getByText(/Password/);
  expect(passwordElement).toBeInTheDocument();

  const submitElement = screen.getByText(/Submit/);
  expect(submitElement).toBeInTheDocument();
});

test('it attempts to login when the submit button is pressed and sets the token', async () => {
  let actualToken;

  render(<Login setToken={(token) => {
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
});

test('it displays an error if the server fails to login', async () => {
  let actualToken;

  render(<Login setToken={(token) => {
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
});