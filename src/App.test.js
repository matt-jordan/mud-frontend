import { render, screen } from '@testing-library/react';
import App from './App';

test('when not logged in, renders the Login', () => {
  sessionStorage.setItem('token', null);

  render(<App />);

  const accountNameElement = screen.getByText(/Account Name/);
  expect(accountNameElement).toBeInTheDocument();

  const passwordElement = screen.getByText(/Password/);
  expect(passwordElement).toBeInTheDocument();

  const submitElement = screen.getByText(/Submit/);
  expect(submitElement).toBeInTheDocument();
});

test('when logged in, it renders the dashboard', () => {
  sessionStorage.setItem('token', '{"token": "foobar" }');

  render(<App />);

  const dashboardElement = screen.getByText(/Dashboard/);
  expect(dashboardElement).toBeInTheDocument();
});