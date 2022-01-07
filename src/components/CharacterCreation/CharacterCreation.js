import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CharacterCreation.css'

import { createCharacter } from '../../utils/restAPI';

export default function CharacterCreation({ account, onSuccess }) {
  const [showForm, toggleForm] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState();
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('female');
  const [description, setDescription] = useState();
  const [characterClass, setCharacterClass] = useState('fighter');
  const [strength, setStrength] = useState(10);
  const [dexterity, setDexterity] = useState(10);
  const [constitution, setConstitution] = useState(10);
  const [intelligence, setIntelligence] = useState(10);
  const [wisdom, setWisdom] = useState(10);
  const [charisma, setCharisma] = useState(10);
  const [totalPoints, setTotalPoints] = useState(12);

  const setDefaults = () => {
    toggleForm(false);
    setError(null);
    setName('');
    setAge(25);
    setGender('female');
    setDescription('');
    setCharacterClass('fighter');
    setStrength(10);
    setDexterity(10);
    setIntelligence(10);
    setConstitution(10);
    setWisdom(10);
    setCharisma(10);
    setTotalPoints(12);
  }

  const setAttribute = (oldValue, _newValue, setter) => {
    const newValue = parseInt(_newValue);
    const delta = oldValue - newValue;
    const newTotalPoints = totalPoints + delta;

    if (newTotalPoints < 0) {
      setError('You cannot allocate that many attribute points');
      return;
    }

    if (newValue <= 0) {
      setError('Attributes cannot be less than 1');
      return;
    }

    setError(null);
    setTotalPoints(totalPoints + delta);
    setter(newValue);
  };

  const handleToggle = () => {
    toggleForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const character = await createCharacter({
        accountName: account.accountName,
        name,
        age: parseInt(age),
        gender,
        description: description || '',
        class: characterClass,
        attributes: {
          strength,
          dexterity,
          constitution,
          intelligence,
          wisdom,
          charisma,
        },
      });
      onSuccess(character);
      setDefaults();
    } catch (error) {
      setError(error.message);
    }
  };

  const errorDisplay = (
    <React.Fragment>
      <label aria-label="Error">{error}</label>
    </React.Fragment>
  );

  const toggleButton = (
    <React.Fragment>
      <button type="button" onClick={handleToggle}>Add Character</button>
    </React.Fragment>
  );

  const characterForm = (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input aria-label="Character Name" type="text" onChange={ e => setName(e.target.value) }/>
        </label>
        <label>
          <p>Age</p>
          <input aria-label="Age" type="number" placeholder="25" onChange={ e => setAge(e.target.value) } />
        </label>
        <label>
          <p>Gender</p>
          <select aria-label="Gender" onChange={ e => setGender(e.target.value) }>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="non-binary">Non-Binary</option>
          </select>
        </label>
        <label>
          <p>Description</p>
          <textarea aria-label="Description" rows="5" cols="24" onChange={ e => setDescription(e.target.value)} />
        </label>
        <label>
          <p>Class</p>
          <select aria-label="Class" onChange={ e => setCharacterClass(e.target.value)}>
            <option value="fighter">Fighter</option>
            <option value="priest">Priest</option>
            <option value="rogue">Rogue</option>
            <option value="wizard">Wizard</option>
          </select>
        </label>
        <label>
          <p>Points Remaining: {totalPoints}</p>
        </label>
        <label>
          <p>Strength ({`${(strength  - 10 ) / 2}`})</p>
          <input aria-label="Strength" type="number" placeholder={`${strength}`}
            onChange={ e => setAttribute(strength, e.target.value, setStrength) } />
        </label>
        <label>
          <p>Dexterity ({`${(dexterity  - 10 ) / 2}`})</p>
          <input aria-label="Dexterity" type="number" placeholder={`${dexterity}`}
            onChange={ e => setAttribute(dexterity, e.target.value, setDexterity) } />
        </label>
        <label>
          <p>Constitution ({`${(constitution  - 10 ) / 2}`})</p>
          <input aria-label="Constitution" type="number" placeholder={`${constitution}`}
            onChange={ e => setAttribute(constitution, e.target.value, setConstitution) } />
        </label>
        <label>
          <p>Intelligence ({`${(intelligence  - 10 ) / 2}`})</p>
          <input aria-label="Intelligence" type="number" placeholder={`${intelligence}`}
            onChange={ e => setAttribute(intelligence, e.target.value, setIntelligence) } />
        </label>
        <label>
          <p>Wisdom ({`${(wisdom  - 10 ) / 2}`})</p>
          <input aria-label="Wisdom" type="number" placeholder={`${wisdom}`}
            onChange={ e => setAttribute(wisdom, e.target.value, setWisdom) } />
        </label>
        <label>
          <p>Charisma ({`${(charisma  - 10 ) / 2}`})</p>
          <input aria-label="Charisma" type="number" placeholder={`${charisma}`}
            onChange={ e => setAttribute(charisma, e.target.value, setCharisma) } />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </React.Fragment>
  );

  return (
    <div className="character-creation-pane">
      {!showForm ? toggleButton : characterForm}
      {error ? errorDisplay : null }
    </div>
  );
}

CharacterCreation.propTypes = {
  account: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
