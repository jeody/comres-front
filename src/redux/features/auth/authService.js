import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  return response.data;
};

// Logout User
const logout = async () => {
  const response = await axios.get(API_URL + 'logout');
  return response.data.message;
};

// Get Login Status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + 'loginStatus');
  return response.data;
};

// Get user profile
const getUser = async () => {
  const response = await axios.get(API_URL + 'getUser');
  return response.data;
};

// Update profile
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + 'updateUser', userData);
  return response.data;
};

// Send Verification Email
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + 'sendVerificationEmail');
  return response.data.message;
};

// Verify User
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verifyUser/${verificationToken}`
  );

  return response.data.message;
};

// Change Password
const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + 'changePassword', userData);

  return response.data.message;
};

// Change Address
const changeAddress = async (userData) => {
  const response = await axios.patch(API_URL + 'changeAddress', userData);

  return response.data.message;
}

// Reset Password
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );

  return response.data.message;
};

// fORGOT Password
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + 'forgotPassword', userData);

  return response.data.message;
};

// Get Users
const getUsers = async () => {
  const response = await axios.get(API_URL + 'getUsers');

  return response.data;
};

// Delete User
const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data.message;
};

// Upgrade User
const upgradeUser = async (userData) => {
  const response = await axios.post(API_URL + 'upgradeUser', userData);

  return response.data.message;
};

// Send Login Code
const sendLoginCode = async (email) => {
  const response = await axios.post(API_URL + `sendLoginCode/${email}`);

  return response.data.message;
};

// Login With Code
const loginWithCode = async (code, email) => {
  const response = await axios.post(API_URL + `loginWithCode/${email}`, code);

  return response.data;
};

// Login With OTP
const loginWithOtp = async (code, email) => {
  const response = await axios.post(API_URL + `loginWithOtp/${email}`, code);
  return response.data;
};

// SendOTP Code
const sendOtpCode = async (email) => {
  const response = await axios.post(API_URL + `sendOtpCode/${email}`);
  return response.data.message;
};

// Login With Google
const loginWithGoogle = async (userToken) => {
  const response = await axios.post(API_URL + 'google/callback', userToken);

  return response.data;
};

// Login User
const uploadPhoto = async (formData, id) => {
  const response = await axios.post(`${API_URL}/upload?userID=` + id, formData);
  return response.data;
};

// Get Applicants
const getApplicants = async () => {
  const response = await axios.get(API_URL + 'getApplicants');

  return response.data;
};

// Get pdfUser profile
const getPdfUser = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Approve Exam Permit
const approveExamPermit = async (userData) => {
  const response = await axios.post(API_URL + 'approveExamPermit', userData);
  return response.data.message;
};

// Approve Abstract Exam
const approveAbstractExam = async (userData) => {
  const response = await axios.post(API_URL + 'approveAbstractExam', userData);
  return response.data.message;
};

// Approve Verbal Exam
const approveVerbalExam = async (userData) => {
  const response = await axios.post(API_URL + 'approveVerbalExam', userData);
  return response.data.message;
};

// Approve Numerical Exam
const approveNumericalExam = async (userData) => {
  const response = await axios.post(API_URL + 'approveNumericalExam', userData);
  return response.data.message;
};

// Change Form Set
const changeFormSet = async (userData) => {
  const response = await axios.post(API_URL + 'changeFormSet', userData);
  return response.data.message;
};

// saveUserScore
const saveUserScore = async (userData) => {
  const response = await axios.patch(API_URL + 'saveUserScore', userData);
  return response.data.message;
};

//saveAbstractScore
const saveAbstractScore = async (userData) => {
  const response = await axios.patch(API_URL + 'saveAbstractScore', userData);
  return response.data.message;
};

//saveVerbalScore
const saveVerbalScore = async (userData) => {
  const response = await axios.patch(API_URL + 'saveVerbalScore', userData);
  return response.data.message;
};

// Get applicant profile
const getApplicant = async (id) => {
  const response = await axios.get(API_URL + 'getApplicant/' + id);
  return response.data;
};

// Update profile
const updateApplicant = async (userData) => {
  const response = await axios.patch(API_URL + 'updateApplicant', userData);
  return response.data;
};

//sendPdftoEmail
const sendPdftoEmail = async (userData) => {
  const response = await axios.post(API_URL + 'sendPdftoEmail', userData);
  return response.data;
};

// profile pics Upload
const profileUpload = async (userId, formData) => {
  const response = await axios.post(API_URL + 'profileUpload/' + userId, formData);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  changeAddress,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
  uploadPhoto,
  getApplicants,
  getPdfUser,
  approveExamPermit,
  approveAbstractExam,
  approveVerbalExam,
  approveNumericalExam,
  changeFormSet,
  saveUserScore,
  saveAbstractScore,
  saveVerbalScore,
  getApplicant,
  updateApplicant,
  sendPdftoEmail,
  profileUpload,
  loginWithOtp,
  sendOtpCode,

};

export default authService;
