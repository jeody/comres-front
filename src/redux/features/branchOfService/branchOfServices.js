import axios from 'axios';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;

// Create BrsvcOfService
const createBranchOfService = async (formData) => {
  const response = await axios.post(
    API_URL + 'branchOfService/createBranchOfService',
    formData
  );
  return response.data;
};

// Get BrsvcOfServices
const getBranchOfServices = async () => {
  const response = await axios.get(
    API_URL + 'branchOfService/getBranchOfServices'
  );
  return response.data;
};

// Delete BrsvcOfService
const deleteBranchOfService = async (slug) => {
  const response = await axios.delete(API_URL + 'branchOfService/' + slug);
  return response.data.message;
};


const branchOfServices = {
  createBranchOfService,
  getBranchOfServices,
  deleteBranchOfService
};

export default branchOfServices;
