import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/members/`;

// Create Member
const addMember = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

//addNewMember
const addNewMember = async (formData) => {
  const response = await axios.post(API_URL + 'addNewMember', formData);
  return response.data;
};

// Delete Member
const deleteMember = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data.message;
};

// Get Member
const getMember = async (id) => {
  const response = await axios.get(API_URL + 'getMember/' + id);
  return response.data;
};

// Update Member
const updateMember = async (id, formData) => {
  const response = await axios.patch(API_URL + id, formData);
  return response.data;
};

// Update Member Education
const updateMemberEduc = async (id, formData) => {
  const response = await axios.patch(API_URL + 'updateMemberEduc/' + id, formData);
  return response.data;
};

// Delete User's Course
const deleteCourse = async (parentId, itemId) => {
  const response = await axios.delete(API_URL + 'deleteCourse/' + parentId + '/item/' + itemId);
  return response.data;
};

// EditCourseEduc
const editEduc = async (parentId, formData) => {
  const response = await axios.patch(API_URL + 'editEduc/' + parentId, formData);
  return response.data;
};

// Approve Course S1
const approveCourseS1 = async (parentId, itemId) => {
  const response = await axios.patch(API_URL + 'approveCourseS1/' + parentId + '/item/' + itemId);
  return response.data;
};

// Approve Course S1
const disApproveCourseS1 = async (parentId, itemId) => {
  const response = await axios.patch(API_URL + 'disApproveCourseS1/' + parentId + '/item/' + itemId);
  return response.data;
};

// Approve Course G1
const approveCourseG1 = async (parentId, itemId) => {
  const response = await axios.patch(API_URL + 'approveCourseG1/' + parentId + '/item/' + itemId);
  return response.data;
};

// DisApprove Course G1
const disApproveCourseG1 = async (parentId, itemId) => {
  const response = await axios.patch(API_URL + 'disApproveCourseG1/' + parentId + '/item/' + itemId);
  return response.data;
};

// Update Member
const courseUpload = async (parentId, educId, formData) => {
  const response = await axios.post(API_URL + 'courseUpload/' + parentId + '/educ/' + educId, formData);
  return response.data;
};

// Update Member Training
const updateMemberTraining = async (id, formData) => {
  const response = await axios.patch(API_URL + 'updateMemberTraining/' + id, formData);
  return response.data;
};

// EditCourseEduc
const editTraining = async (parentId, formData) => {
  const response = await axios.patch(API_URL + 'editTraining/' + parentId, formData);
  return response.data;
};

// Delete TRaining Course
const deleteTraining = async (parentId, itemId) => {
  const response = await axios.delete(API_URL + 'deleteTraining/' + parentId + '/item/' + itemId);
  return response.data;
};

// approveTrainingS1
const approveTrainingS1 = async (parentId, itemId) => {
  const response = await axios.patch(API_URL + 'approveTrainingS1/' + parentId + '/item/' + itemId);
  return response.data;
};

// disApproveTrainingS1
const disApproveTrainingS1 = async (parentId, itemId) => {
  const response = await axios.patch(API_URL + 'disApproveTrainingS1/' + parentId + '/item/' + itemId);
  return response.data;
};

// approveTrainingG1
const approveTrainingG1 = async (parentId, itemId) => {
  const response = await axios.patch(API_URL + 'approveTrainingG1/' + parentId + '/item/' + itemId);
  return response.data;
};

// disApproveTrainingG1
const disApproveTrainingG1 = async (parentId, itemId) => {
  const response = await axios.patch(API_URL + 'disApproveTrainingG1/' + parentId + '/item/' + itemId);
  return response.data;
};

// trainingCourseUpload
const trainingCourseUpload = async (parentId, trainId, formData) => {
  const response = await axios.post(API_URL + 'trainingCourseUpload/' + parentId + '/train/' + trainId, formData);
  return response.data;
};

// updateActiveDuty
const updateActiveDuty = async (id, formData) => {
  const response = await axios.patch(API_URL + 'updateActiveDuty/' + id, formData);
  return response.data;
};

// editActiveDuty
const editActiveDuty = async (parentId, formData) => {
  const response = await axios.patch(API_URL + 'editActiveDuty/' + parentId, formData);
  return response.data;
};

// activeDutyUpload
const activeDutyUpload = async (parentId, activeId, formData) => {
  const response = await axios.post(API_URL + 'activeDutyUpload/' + parentId + '/active/' + activeId, formData);
  return response.data;
};

// Create Reservist
const addReservist = async (data) => {
  const response = await axios.post(API_URL + 'addReservist', data);
  return response.data;
};

// Photo Upload
const photoUpload = async (formData, userId) => {
  const response = await axios.post(API_URL + 'photoUpload?userId=' + userId, formData);
  return response.data;
};

// approveActiveDutyS1
const approveActiveDutyS1 = async (parentId, itemId) => {
  const response = await axios.patch(API_URL + 'approveActiveDutyS1/' + parentId + '/item/' + itemId);
  return response.data;
};
 
// disapproveActiveDutyS1
const disapproveActiveDutyS1 = async (parentId, itemId) => {
  const response = await axios.patch(API_URL + 'disapproveActiveDutyS1/' + parentId + '/item/' + itemId);
  return response.data;
};

// disapproveActiveDutyG1
const disapproveActiveDutyG1 = async (parentId, itemId) => {
  const response = await axios.patch(API_URL + 'disapproveActiveDutyG1/' + parentId + '/item/' + itemId);
  return response.data;
};

// approveActiveDutyG1
const approveActiveDutyG1 = async (parentId, itemId) => {
  const response = await axios.patch(API_URL + 'approveActiveDutyG1/' + parentId + '/item/' + itemId);
  return response.data;
};

// Delete Active Duty
const deleteActiveDuty = async (parentId, itemId) => {
  const response = await axios.delete(API_URL + 'deleteActiveDuty/' + parentId + '/item/' + itemId);
  return response.data;
};

// updateMemberDesignation
const updateMemberDesignation = async (id, formData) => {
  const response = await axios.patch(API_URL + 'updateMemberDesignation/' + id, formData);
  return response.data;
};

// editDesignation
const editDesignation = async (parentId, formData) => {
  const response = await axios.patch(API_URL + 'editDesignation/' + parentId, formData);
  return response.data;
};

// designationUpload
const designationUpload = async (parentId, desigId, formData) => {
  const response = await axios.post(API_URL + 'designationUpload/' + parentId + '/desig/' + desigId, formData);
  return response.data;
};

// approveDesignationS1
const approveDesignationS1 = async (parentId, desigId) => {
  const response = await axios.patch(API_URL + 'approveDesignationS1/' + parentId + '/desig/' + desigId);
  return response.data;
};
 
// disApproveDesignationS1
const disApproveDesignationS1 = async (parentId, desigId) => {
  const response = await axios.patch(API_URL + 'disApproveDesignationS1/' + parentId + '/desig/' + desigId);
  return response.data;
};
 
// approveDesignationG1
const approveDesignationG1 = async (parentId, desigId) => {
  const response = await axios.patch(API_URL + 'approveDesignationG1/' + parentId + '/desig/' + desigId);
  return response.data;
};

// disApproveDesignationG1
const disApproveDesignationG1 = async (parentId, desigId) => {
  const response = await axios.patch(API_URL + 'disApproveDesignationG1/' + parentId + '/desig/' + desigId);
  return response.data;
};
 
// deleteDesignation
const deleteDesignation = async (parentId, desigId) => {
  const response = await axios.delete(API_URL + 'deleteDesignation/' + parentId + '/desig/' + desigId);
  return response.data;
};

// updateMemberAward
const updateMemberAward = async (id, formData) => {
  const response = await axios.patch(API_URL + 'updateMemberAward/' + id, formData);
  return response.data;
};

// editAward
const editAward = async (parentId, formData) => {
  const response = await axios.patch(API_URL + 'editAward/' + parentId, formData);
  return response.data;
};

// awardUpload
const awardUpload = async (parentId, awardId, formData) => {
  const response = await axios.post(API_URL + 'awardUpload/' + parentId + '/award/' + awardId, formData);
  return response.data;
};

// approveAwardS1
const approveAwardS1 = async (parentId, awardId) => {
  const response = await axios.patch(API_URL + 'approveAwardS1/' + parentId + '/award/' + awardId);
  return response.data;
};
 
// disApproveAwardS1
const disApproveAwardS1 = async (parentId, awardId) => {
  const response = await axios.patch(API_URL + 'disApproveAwardS1/' + parentId + '/award/' + awardId);
  return response.data;
};
 
// approveAwardG1
const approveAwardG1 = async (parentId, awardId) => {
  const response = await axios.patch(API_URL + 'approveAwardG1/' + parentId + '/award/' + awardId);
  return response.data;
};

// disApproveAwardG1
const disApproveAwardG1 = async (parentId, awardId) => {
  const response = await axios.patch(API_URL + 'disApproveAwardG1/' + parentId + '/award/' + awardId);
  return response.data;
};
 
// deleteAward
const deleteAward = async (parentId, awardId) => {
  const response = await axios.delete(API_URL + 'deleteAward/' + parentId + '/award/' + awardId);
  return response.data;
};

// updateMemberDependent
const updateMemberDependent = async (id, formData) => {
  const response = await axios.patch(API_URL + 'updateMemberDependent/' + id, formData);
  return response.data;
};

// editDependent
const editDependent = async (parentId, formData) => {
  const response = await axios.patch(API_URL + 'editDependent/' + parentId, formData);
  return response.data;
};

// dependentUpload
const dependentUpload = async (parentId, dependentId, formData) => {
  const response = await axios.post(API_URL + 'dependentUpload/' + parentId + '/dependent/' + dependentId, formData);
  return response.data;
};

// approveDependentS1
const approveDependentS1 = async (parentId, dependentId) => {
  const response = await axios.patch(API_URL + 'approveDependentS1/' + parentId + '/dependent/' + dependentId);
  return response.data;
};
 
// disApproveDependentS1
const disApproveDependentS1 = async (parentId, dependentId) => {
  const response = await axios.patch(API_URL + 'disApproveDependentS1/' + parentId + '/dependent/' + dependentId);
  return response.data;
};
 
// approveDependentG1
const approveDependentG1 = async (parentId, dependentId) => {
  const response = await axios.patch(API_URL + 'approveDependentG1/' + parentId + '/dependent/' + dependentId);
  return response.data;
};
 
// disApproveDependentG1
const disApproveDependentG1 = async (parentId, dependentId) => {
  const response = await axios.patch(API_URL + 'disApproveDependentG1/' + parentId + '/dependent/' + dependentId);
  return response.data;
};
 
// deleteDependent
const deleteDependent = async (parentId, dependentId) => {
  const response = await axios.delete(API_URL + 'deleteDependent/' + parentId + '/dependent/' + dependentId);
  return response.data;
};

// updateMemberPromotion
const updateMemberPromotion = async (id, formData) => {
  const response = await axios.patch(API_URL + 'updateMemberPromotion/' + id, formData);
  return response.data;
};

// editPromotion
const editPromotion = async (parentId, formData) => {
  const response = await axios.patch(API_URL + 'editPromotion/' + parentId, formData);
  return response.data;
};

// promotionUpload
const promotionUpload = async (parentId, promotionId, formData) => {
  const response = await axios.post(API_URL + 'promotionUpload/' + parentId + '/promotion/' + promotionId, formData);
  return response.data;
};

// approvePromotionS1
const approvePromotionS1 = async (parentId, promotionId) => {
  const response = await axios.patch(API_URL + 'approvePromotionS1/' + parentId + '/promotion/' + promotionId);
  return response.data;
};
 
// disApprovePromotionS1
const disApprovePromotionS1 = async (parentId, promotionId) => {
  const response = await axios.patch(API_URL + 'disApprovePromotionS1/' + parentId + '/promotion/' + promotionId);
  return response.data;
};

// approvePromotionG1
const approvePromotionG1 = async (parentId, promotionId) => {
  const response = await axios.patch(API_URL + 'approvePromotionG1/' + parentId + '/promotion/' + promotionId);
  return response.data;
};
 
// disApprovePromotionG1
const disApprovePromotionG1 = async (parentId, promotionId) => {
  const response = await axios.patch(API_URL + 'disApprovePromotionG1/' + parentId + '/promotion/' + promotionId);
  return response.data;
};

// deletePromotion
const deletePromotion = async (parentId, promotionId) => {
  const response = await axios.delete(API_URL + 'deletePromotion/' + parentId + '/promotion/' + promotionId);
  return response.data;
};

// updateMemberActivity
const updateMemberActivity = async (id, formData) => {
  const response = await axios.patch(API_URL + 'updateMemberActivity/' + id, formData);
  return response.data;
};

// editActivity
const editActivity = async (parentId, formData) => {
  const response = await axios.patch(API_URL + 'editActivity/' + parentId, formData);
  return response.data;
};

// activityUpload
const activityUpload = async (parentId, activityId, formData) => {
  const response = await axios.post(API_URL + 'activityUpload/' + parentId + '/activity/' + activityId, formData);
  return response.data;
};

// approveActivityS1
const approveActivityS1 = async (parentId, activityId) => {
  const response = await axios.patch(API_URL + 'approveActivityS1/' + parentId + '/activity/' + activityId);
  return response.data;
};
 
// disApproveActivityS1
const disApproveActivityS1 = async (parentId, activityId) => {
  const response = await axios.patch(API_URL + 'disApproveActivityS1/' + parentId + '/activity/' + activityId);
  return response.data;
};

// approveActivityG1
const approveActivityG1 = async (parentId, activityId) => {
  const response = await axios.patch(API_URL + 'approveActivityG1/' + parentId + '/activity/' + activityId);
  return response.data;
};
 
// disApproveActivityG1
const disApproveActivityG1 = async (parentId, activityId) => {
  const response = await axios.patch(API_URL + 'disApproveActivityG1/' + parentId + '/activity/' + activityId);
  return response.data;
};

// deletePromotion
const deleteActivity = async (parentId, activityId) => {
  const response = await axios.delete(API_URL + 'deleteActivity/' + parentId + '/activity/' + activityId);
  return response.data;
};

// getDataAndUpdate
const getDataAndUpdate = async (id, data) => {
  const response = await axios.patch(API_URL + 'getDataAndUpdate/' + id, data);
  return response.data;
};

// getEducDataAndUpdate
const getEducDataAndUpdate = async (id, data) => {
  const response = await axios.patch(API_URL + 'getEducDataAndUpdate/' + id, data);
  return response.data;
};

// getTrainingDataAndUpdate
const getTrainingDataAndUpdate = async (id, data) => {
  const response = await axios.patch(API_URL + 'getTrainingDataAndUpdate/' + id, data);
  return response.data;
};

// getAdtDataAndUpdate
const getAdtDataAndUpdate = async (id, data) => {
  const response = await axios.patch(API_URL + 'getAdtDataAndUpdate/' + id, data);
  return response.data;
};

// getDesignationDataAndUpdate
const getDesignationDataAndUpdate = async (id, data) => {
  const response = await axios.patch(API_URL + 'getDesignationDataAndUpdate/' + id, data);
  return response.data;
};
  
//getAwardDataAndUpdate
const getAwardDataAndUpdate = async (id, data) => {
  const response = await axios.patch(API_URL + 'getAwardDataAndUpdate/' + id, data);
  return response.data;
}

//getDependentDataAndUpdate
const getDependentDataAndUpdate = async (id, data) => {
  const response = await axios.patch(API_URL + 'getDependentDataAndUpdate/' + id, data);
  return response.data;
}

//getPromotionDataAndUpdate
const getPromotionDataAndUpdate = async (id, data) => {
  const response = await axios.patch(API_URL + 'getPromotionDataAndUpdate/' + id, data);
  return response.data;
}

//getActivityDataAndUpdate
const getActivityDataAndUpdate = async (id, data) => {
  const response = await axios.patch(API_URL + 'getActivityDataAndUpdate/' + id, data);
  return response.data;
}

// getMembers
const getMembers = async () => {
  const response = await axios.get(API_URL + 'getMembers');
  return response.data;
};

//deleteReservist
const deleteReservist = async (id) => {
  const response = await axios.delete(API_URL + 'deleteReservist/' + id);
  return response.data.message;
}

// updateMemberDerogatory
const updateMemberDerogatory = async (id, formData) => {
  const response = await axios.patch(API_URL + 'updateMemberDerogatory/' + id, formData);
  return response.data;
};

const ridsService = {
  addMember,
  addNewMember,
  addReservist,
  getMember,
  getMembers,
  deleteMember,
  updateMember,
  updateMemberEduc,
  deleteCourse,
  editEduc,
  approveCourseS1,
  disApproveCourseS1,
  approveCourseG1,
  disApproveCourseG1,
  courseUpload,
  editTraining,
  updateMemberTraining,
  deleteTraining,
  approveTrainingS1,
  disApproveTrainingS1,
  approveTrainingG1,
  disApproveTrainingG1,
  trainingCourseUpload,
  updateActiveDuty,
  editActiveDuty,
  activeDutyUpload,
  photoUpload,
  approveActiveDutyS1,
  disapproveActiveDutyS1,
  approveActiveDutyG1,
  disapproveActiveDutyG1,
  deleteActiveDuty,
  updateMemberDesignation,
  editDesignation,
  designationUpload,
  approveDesignationS1,
  disApproveDesignationS1,
  approveDesignationG1,
  disApproveDesignationG1,
  deleteDesignation,
  updateMemberAward,
  editAward,
  awardUpload,
  approveAwardS1,
  disApproveAwardS1,
  approveAwardG1,
  disApproveAwardG1,
  deleteAward,
  updateMemberDependent,
  editDependent,
  dependentUpload,
  approveDependentS1,
  disApproveDependentS1,
  approveDependentG1,
  disApproveDependentG1,
  deleteDependent,
  updateMemberPromotion,
  editPromotion,
  promotionUpload,
  approvePromotionS1,
  disApprovePromotionS1,
  approvePromotionG1,
  disApprovePromotionG1,
  deletePromotion,
  updateMemberActivity,
  editActivity,
  activityUpload,
  approveActivityS1,
  disApproveActivityS1,
  approveActivityG1,
  disApproveActivityG1,
  deleteActivity,
  getDataAndUpdate,
  getEducDataAndUpdate,
  getTrainingDataAndUpdate,
  getAdtDataAndUpdate,
  getDesignationDataAndUpdate,
  getAwardDataAndUpdate,
  getDependentDataAndUpdate,
  getPromotionDataAndUpdate,
  getActivityDataAndUpdate,
  deleteReservist,
  updateMemberDerogatory,
};

export default ridsService;