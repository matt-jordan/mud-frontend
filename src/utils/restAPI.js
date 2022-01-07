import axios from 'axios';

let authHeader;

const serverUri = 'http://localhost:8080';

function initAPI(token) {
  authHeader = { 'Authorization': `Bearer ${token}` };
}

async function login(accountName, password) {
  const response = await axios.post(`${serverUri}/login`, {
    accountName,
    password,
  });

  return response.data;
}

async function createAccount(params) {
  const { accountName, email, password } = params;

  const response = await axios.post(`${serverUri}/accounts/${accountName}`, {
    email,
    password,
  });

  return response;
}

async function getAccountDetails(accountName) {
  const response = await axios.get(`${serverUri}/accounts/${accountName}`, {
    headers: { ...authHeader }
  });

  return response.data;
}

async function createCharacter(params) {
  const response = await axios.post(`${serverUri}/characters`, params, {
      headers: { ...authHeader }
  });

  return response.data;
}

async function getCharacterDetails(characterId) {
  const response = await axios.get(`${serverUri}/characters/${characterId}`, {
    headers: { ...authHeader }
  });

  return response.data;
}

async function getAllCharacterDetails(account) {
  const characters = [];

  const promises = account.characterIds.map((characterId) => getCharacterDetails(characterId));
  await Promise.all(promises).then((results) => {
    characters.push(...results);
  });

  return characters;
}


export {
  initAPI,
  login,
  createAccount,
  getAccountDetails,
  createCharacter,
  getAllCharacterDetails,
  getCharacterDetails,
};
