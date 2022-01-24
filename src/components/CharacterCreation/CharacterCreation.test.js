//------------------------------------------------------------------------------
// MJMUD Frontend
// Copyright (C) 2022, Matt Jordan
//
// This program is free software, distributed under the terms of the
// MIT License. See the LICENSE file at the top of the source tree.
//------------------------------------------------------------------------------

import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

import CharacterCreation from './CharacterCreation';

jest.mock('axios');

const testAccount = {
  accountName: 'test',
};

describe('when not enabled', () => {
  test('renders basic fields', () => {
    render(<CharacterCreation onSuccess={() => { }} account={ testAccount } />);

    const addCharacterElement = screen.getByText(/Add Character/);
    expect(addCharacterElement).toBeInTheDocument();
  });
});

describe('when enabled', () => {

  let actualCharacter;

  afterEach(() => {
    actualCharacter = null;
  });

  function onSuccess(character) {
    actualCharacter = character;
  }

  function preTestSetup() {
    render(<CharacterCreation onSuccess={onSuccess} account={testAccount} />);
    const addCharacterElement = screen.getByText(/Add Character/);
    fireEvent.click(addCharacterElement);
  }

  test('it renders all the expected elements', () => {
    preTestSetup();

    const nameInput = screen.getByLabelText(/Character Name/);
    expect(nameInput).toBeInTheDocument();

    const ageInput = screen.getByLabelText(/Age/);
    expect(ageInput).toBeInTheDocument();

    const genderInput = screen.getByLabelText(/Gender/);
    expect(genderInput).toBeInTheDocument();

    const descriptionInput = screen.getByLabelText(/Description/);
    expect(descriptionInput).toBeInTheDocument();

    const classInput = screen.getByLabelText(/Class/);
    expect(classInput).toBeInTheDocument();

    const strengthInput = screen.getByLabelText(/Strength/);
    expect(strengthInput).toBeInTheDocument();

    const dexterityInput = screen.getByLabelText(/Dexterity/);
    expect(dexterityInput).toBeInTheDocument();

    const constitutionInput = screen.getByLabelText(/Constitution/);
    expect(constitutionInput).toBeInTheDocument();

    const intelligenceInput = screen.getByLabelText(/Intelligence/);
    expect(intelligenceInput).toBeInTheDocument();

    const wisdomInput = screen.getByLabelText(/Wisdom/);
    expect(wisdomInput).toBeInTheDocument();

    const charismaInput = screen.getByLabelText(/Charisma/);
    expect(charismaInput).toBeInTheDocument();

    const submitButton = screen.getByText(/Submit/);
    expect(submitButton).toBeInTheDocument();
  });

  [/Strength/, /Dexterity/, /Constitution/, /Intelligence/, /Wisdom/, /Charisma/].forEach((attribute) => {
    test(`when ${attribute} exceeds the allowed attribute limit it sets an error`, () => {
      preTestSetup();

      const element = screen.getByLabelText(attribute);
      expect(element).toBeInTheDocument();
      fireEvent.change(element, { target: { value: 1000 }});

      const errorLabel = screen.getByLabelText(/Error/);
      expect(errorLabel).toBeInTheDocument();
    });
  });

  test('when character creation fails it sets an error', async () => {
    preTestSetup();
    axios.post.mockRejectedValueOnce(new Error('foobar'));

    const nameInput = screen.getByLabelText(/Character Name/);
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'foo' }});

    const submitButton = screen.getByText(/Submit/);
    // This is necessary as it fires an async event that would otherwise
    // be unhandled without act.
    await act(async () => fireEvent.click(submitButton));

    const errorLabel = screen.getByLabelText(/Error/);
    expect(errorLabel).toBeInTheDocument();
    expect(errorLabel.textContent).toEqual('foobar');

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/characters', {
      accountName: 'test',
      name: 'foo',
      class: 'fighter',
      gender: 'female',
      age: 25,
      description: '',
      attributes: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      },
    }, {
      'headers': {},
    });
  });

  test('when character creation succeeds with defaults it calls the success callback and resets', async () => {
    preTestSetup();
    axios.post.mockImplementation((url, data) => {
      return Promise.resolve({
        data: {
          name: 'foo',
        },
      });
    });

    const nameInput = screen.getByLabelText(/Character Name/);
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'foo' }});

    const submitButton = screen.getByText(/Submit/);
    // This is necessary as it fires an async event that would otherwise
    // be unhandled without act.
    await act(async () => fireEvent.click(submitButton));

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/characters', {
      accountName: 'test',
      name: 'foo',
      class: 'fighter',
      gender: 'female',
      age: 25,
      description: '',
      attributes: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      },
    }, {
      'headers': {},
    });
    expect(actualCharacter).toEqual({'name': 'foo'});

    const addCharacterElement = screen.getByText(/Add Character/);
    expect(addCharacterElement).toBeInTheDocument();
  });

  test('when character creation succeeds with non-defaults it calls the success callback and resets', async () => {
    preTestSetup();
    axios.post.mockImplementation((url, data) => {
      return Promise.resolve({
        data: {
          name: 'foo',
        },
      });
    });

    const nameInput = screen.getByLabelText(/Character Name/);
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: 'foo' }});

    const ageInput = screen.getByLabelText(/Age/);
    expect(ageInput).toBeInTheDocument();
    fireEvent.change(ageInput, { target: { value: 30 }});

    const genderInput = screen.getByLabelText(/Gender/);
    expect(genderInput).toBeInTheDocument();
    fireEvent.change(genderInput, { target: { value: 'male' }});

    const descriptionInput = screen.getByLabelText(/Description/);
    expect(descriptionInput).toBeInTheDocument();
    fireEvent.change(descriptionInput, { target: { value: 'foo-bar' }});

    const classInput = screen.getByLabelText(/Class/);
    expect(classInput).toBeInTheDocument();
    fireEvent.change(classInput, { target: { value: 'priest' }});

    const strengthInput = screen.getByLabelText(/Strength/);
    expect(strengthInput).toBeInTheDocument();
    fireEvent.change(strengthInput, { target: { value: 8 }});

    const dexterityInput = screen.getByLabelText(/Dexterity/);
    expect(dexterityInput).toBeInTheDocument();
    fireEvent.change(dexterityInput, { target: { value: 12 }});

    const constitutionInput = screen.getByLabelText(/Constitution/);
    expect(constitutionInput).toBeInTheDocument();
    fireEvent.change(constitutionInput, { target: { value: 8 }});

    const intelligenceInput = screen.getByLabelText(/Intelligence/);
    expect(intelligenceInput).toBeInTheDocument();
    fireEvent.change(intelligenceInput, { target: { value: 12 }});

    const wisdomInput = screen.getByLabelText(/Wisdom/);
    expect(wisdomInput).toBeInTheDocument();
    fireEvent.change(wisdomInput, { target: { value: 8 }});

    const charismaInput = screen.getByLabelText(/Charisma/);
    expect(charismaInput).toBeInTheDocument();
    fireEvent.change(charismaInput, { target: { value: 12 }});

    const submitButton = screen.getByText(/Submit/);
    // This is necessary as it fires an async event that would otherwise
    // be unhandled without act.
    await act(async () => fireEvent.click(submitButton));

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/characters', {
      accountName: 'test',
      name: 'foo',
      class: 'priest',
      gender: 'male',
      age: 30,
      description: 'foo-bar',
      attributes: {
        strength: 8,
        dexterity: 12,
        constitution: 8,
        intelligence: 12,
        wisdom: 8,
        charisma: 12,
      },
    }, {
      'headers': {},
    });
    expect(actualCharacter).toEqual({'name': 'foo'});

    const addCharacterElement = screen.getByText(/Add Character/);
    expect(addCharacterElement).toBeInTheDocument();
  });
});