import { render, screen } from '@testing-library/react';

import CharacterDisplay from './CharacterDisplay';

test('when the character is displayed it shows the appropriate properties', () => {

  const character = {
    name: 'foobar',
    age: 30,
    gender: 'male',
    description: 'test',
    classes: [{ type: 'fighter', level: 1 }],
    attributes: {
      strength: 11,
      dexterity: 12,
      constitution: 13,
      intelligence: 14,
      wisdom: 15,
      charisma: 16,
      hitpoints: { base: 100 },
      manapoints: { base: 110 },
      energypoints: { base: 120 },
    },
  };

  render(<CharacterDisplay character={character} />);
  const nameElement = screen.getByLabelText(/Character Name/);
  expect(nameElement).toBeInTheDocument();

  const ageElement = screen.getByLabelText(/Age/);
  expect(ageElement).toBeInTheDocument();

  const genderElement = screen.getByLabelText(/Gender/);
  expect(genderElement).toBeInTheDocument();

  const descriptionElement = screen.getByLabelText(/Description/);
  expect(descriptionElement).toBeInTheDocument();

  const classElement = screen.getByLabelText(/Class/);
  expect(classElement).toBeInTheDocument();

  const attributesElement = screen.getByLabelText(/Attributes/);
  expect(attributesElement).toBeInTheDocument();
});
