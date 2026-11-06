import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/ranks/`;

// Create Rank
const createRank = async (formData) => {
  const response = await axios.post(API_URL + 'createRank', formData);
  return response.data;
};

// Get Ranks
const getRanks = async () => {
  const response = await axios.get(API_URL + 'getRanks');
  return response.data;
};

// Delete Rank
const deleteRank = async (id) => {
  const response = await axios.delete(API_URL + 'deleteRank' + id);
  return response.data.message;
};

// Get Rank
const getRank = async (id) => {
  const response = await axios.get(API_URL + 'getRank' + id);
  return response.data;
};

// Update Rank
const updateRank = async (id, formData) => {
  const response = await axios.patch(API_URL + 'updateRank' + id, formData);
  return response.data;
};

const rankService = {
  createRank,
  getRanks,
  deleteRank,
  getRank,
  updateRank,
};

export default rankService;