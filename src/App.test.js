//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

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

  const dashboardElement = screen.getByText(/Main/);
  expect(dashboardElement).toBeInTheDocument();
});