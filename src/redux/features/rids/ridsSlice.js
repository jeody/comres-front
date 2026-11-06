import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import ridsService from './ridsService';

const initialState = {
  member: null,
  members: [],
  name: '',
  email: '',
  photo: '',
  phone: '',
  isVerified: false,
  address: '',
  barangay: '',
  city: '',
  cityId: '',
  country: '',
  province: '',
  provinceId: '',
  region: '',
  regionId: '',
  street: '',
  branchOfService: '',
  birthDate: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Add New Member
export const addMember = createAsyncThunk(
  'members/addMember',
  async (formData, thunkAPI) => {
    try {
      return await ridsService.addMember(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// addNewMember
export const addNewMember = createAsyncThunk(
  'members/addNewMember',
  async (formData, thunkAPI) => {
    try {
      return await ridsService.addNewMember(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Member
export const getMember = createAsyncThunk(
  'members/getMember',
  async (id, thunkAPI) => {
    try {
      return await ridsService.getMember(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update member
export const updateMember = createAsyncThunk(
  'members/updateMember',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await ridsService.updateMember(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update member Education
export const updateMemberEduc = createAsyncThunk(
  'members/updateMemberEduc',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await ridsService.updateMemberEduc(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// deleteMemberCourse
export const deleteCourse = createAsyncThunk(
  'members/deleteCourse',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.deleteCourse(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit Course Education
export const editEduc = createAsyncThunk(
  'members/editEduc',
  async ({ parentId, formData }, thunkAPI) => {
    try {
      return await ridsService.editEduc(parentId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveCourseS1
export const approveCourseS1 = createAsyncThunk(
  'members/approveCourseS1',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.approveCourseS1(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApproveCourseS1
export const disApproveCourseS1 = createAsyncThunk(
  'members/disApproveCourseS1',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.disApproveCourseS1(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveCourseG1
export const approveCourseG1 = createAsyncThunk(
  'members/approveCourseG1',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.approveCourseG1(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApproveCourseG1
export const disApproveCourseG1 = createAsyncThunk(
  'members/disApproveCourseG1',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.disApproveCourseG1(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// courseUpload
export const courseUpload = createAsyncThunk(
  'members/courseUpload',
  async ({ parentId, educId, formData }, thunkAPI) => {
    try {
      return await ridsService.courseUpload(parentId, educId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Member Training
export const updateMemberTraining = createAsyncThunk(
  'members/updateMemberTraining',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await ridsService.updateMemberTraining(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit Course Training
export const editTraining = createAsyncThunk(
  'members/editTraining',
  async ({ parentId, formData }, thunkAPI) => {
    try {
      return await ridsService.editTraining(parentId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// deleteMembertraining
export const deleteTraining = createAsyncThunk(
  'members/deleteTraining',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.deleteTraining(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveTrainingS1
export const approveTrainingS1 = createAsyncThunk(
  'members/approveTrainingS1',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.approveTrainingS1(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApproveTrainingS1
export const disApproveTrainingS1 = createAsyncThunk(
  'members/disApproveTrainingS1',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.disApproveTrainingS1(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveTrainingG1
export const approveTrainingG1 = createAsyncThunk(
  'members/approveTrainingG1',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.approveTrainingG1(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApproveTrainingG1
export const disApproveTrainingG1 = createAsyncThunk(
  'members/disApproveTrainingG1',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.disApproveTrainingG1(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// trainingCourseUpload
export const trainingCourseUpload = createAsyncThunk(
  'members/trainingCourseUpload',
  async ({ parentId, trainId, formData }, thunkAPI) => {
    try {
      return await ridsService.trainingCourseUpload(parentId, trainId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// updateActiveDuty
export const updateActiveDuty = createAsyncThunk(
  'members/updateActiveDuty',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await ridsService.updateActiveDuty(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit Active Duty Training
export const editActiveDuty = createAsyncThunk(
  'members/editActiveDuty',
  async ({ parentId, formData }, thunkAPI) => {
    try {
      return await ridsService.editActiveDuty(parentId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// activeDutyUpload
export const activeDutyUpload = createAsyncThunk(
  'members/activeDutyUpload',
  async ({ parentId, activeId, formData }, thunkAPI) => {
    try {
      return await ridsService.activeDutyUpload(parentId, activeId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add Reservist
export const addReservist = createAsyncThunk(
  'members/addReservist',
  async (data, thunkAPI) => {
    try {
      return await ridsService.addReservist(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Photo Upload
export const photoUpload = createAsyncThunk(
  'members/photoUpload',
  async ({ formData, userId }, thunkAPI) => {
    try {
      return await ridsService.photoUpload(formData, userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveActiveDutyS1
export const approveActiveDutyS1 = createAsyncThunk(
  'members/approveActiveDutyS1',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.approveActiveDutyS1(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disapproveActiveDutyS1
export const disapproveActiveDutyS1 = createAsyncThunk(
  'members/disapproveActiveDutyS1',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.disapproveActiveDutyS1(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveActiveDutyG1
export const approveActiveDutyG1 = createAsyncThunk(
  'members/approveActiveDutyG1',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.approveActiveDutyG1(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disapproveActiveDutyG1
export const disapproveActiveDutyG1 = createAsyncThunk(
  'members/disapproveActiveDutyG1',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.disapproveActiveDutyG1(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// deleteActiveDuty
export const deleteActiveDuty = createAsyncThunk(
  'members/deleteActiveDuty',
  async ({parentId, itemId }, thunkAPI) => {
    try {
      return await ridsService.deleteActiveDuty(parentId, itemId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// updateMemberDesignation
export const updateMemberDesignation = createAsyncThunk(
  'members/updateMemberDesignation',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await ridsService.updateMemberDesignation(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//editDesignation,
export const editDesignation = createAsyncThunk(
  'members/editDesignation',
  async ({ parentId, formData }, thunkAPI) => {
    try {
      return await ridsService.editDesignation(parentId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// designationUpload
export const designationUpload = createAsyncThunk(
  'members/designationUpload',
  async ({ parentId, desigId, formData }, thunkAPI) => {
    try {
      return await ridsService.designationUpload(parentId, desigId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveDesignationS1
export const approveDesignationS1 = createAsyncThunk(
  'members/approveDesignationS1',
  async ({parentId, desigId }, thunkAPI) => {
    try {
      return await ridsService.approveDesignationS1(parentId, desigId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApproveDesignationS1
export const disApproveDesignationS1 = createAsyncThunk(
  'members/disApproveDesignationS1',
  async ({parentId, desigId }, thunkAPI) => {
    try {
      return await ridsService.disApproveDesignationS1(parentId, desigId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveDesignationG1
export const approveDesignationG1 = createAsyncThunk(
  'members/approveDesignationG1',
  async ({parentId, desigId }, thunkAPI) => {
    try {
      return await ridsService.approveDesignationG1(parentId, desigId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApproveDesignationG1
export const disApproveDesignationG1 = createAsyncThunk(
  'members/disApproveDesignationG1',
  async ({parentId, desigId }, thunkAPI) => {
    try {
      return await ridsService.disApproveDesignationG1(parentId, desigId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// deleteDesignation
export const deleteDesignation = createAsyncThunk(
  'members/deleteDesignation',
  async ({parentId, desigId }, thunkAPI) => {
    try {
      return await ridsService.deleteDesignation(parentId, desigId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// updateMemberAward
export const updateMemberAward = createAsyncThunk(
  'members/updateMemberAward',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await ridsService.updateMemberAward(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//editAward,
export const editAward = createAsyncThunk(
  'members/editAward',
  async ({ parentId, formData }, thunkAPI) => {
    try {
      return await ridsService.editAward(parentId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// awardUpload
export const awardUpload = createAsyncThunk(
  'members/awardUpload',
  async ({ parentId, awardId, formData }, thunkAPI) => {
    try {
      return await ridsService.awardUpload(parentId, awardId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveAwardS1
export const approveAwardS1 = createAsyncThunk(
  'members/approveAwardS1',
  async ({parentId, awardId }, thunkAPI) => {
    try {
      return await ridsService.approveAwardS1(parentId, awardId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApproveAwardS1
export const disApproveAwardS1 = createAsyncThunk(
  'members/disApproveAwardS1',
  async ({parentId, awardId }, thunkAPI) => {
    try {
      return await ridsService.disApproveAwardS1(parentId, awardId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveAwardG1
export const approveAwardG1 = createAsyncThunk(
  'members/approveAwardG1',
  async ({parentId, awardId }, thunkAPI) => {
    try {
      return await ridsService.approveAwardG1(parentId, awardId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApproveAwardG1
export const disApproveAwardG1 = createAsyncThunk(
  'members/disApproveAwardG1',
  async ({parentId, awardId }, thunkAPI) => {
    try {
      return await ridsService.disApproveAwardG1(parentId, awardId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// deleteAward
export const deleteAward = createAsyncThunk(
  'members/deleteAward',
  async ({parentId, awardId }, thunkAPI) => {
    try {
      return await ridsService.deleteAward(parentId, awardId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// updateMemberDependent
export const updateMemberDependent = createAsyncThunk(
  'members/updateMemberDependent',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await ridsService.updateMemberDependent(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//editDependent,
export const editDependent = createAsyncThunk(
  'members/editDependent',
  async ({ parentId, formData }, thunkAPI) => {
    try {
      return await ridsService.editDependent(parentId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// dependentUpload
export const dependentUpload = createAsyncThunk(
  'members/dependentUpload',
  async ({ parentId, dependentId, formData }, thunkAPI) => {
    try {
      return await ridsService.dependentUpload(parentId, dependentId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveDependentS1
export const approveDependentS1 = createAsyncThunk(
  'members/approveDependentS1',
  async ({parentId, dependentId }, thunkAPI) => {
    try {
      return await ridsService.approveDependentS1(parentId, dependentId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApproveDependentS1
export const disApproveDependentS1 = createAsyncThunk(
  'members/disApproveDependentS1',
  async ({parentId, dependentId }, thunkAPI) => {
    try {
      return await ridsService.disApproveDependentS1(parentId, dependentId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveDependentG1
export const approveDependentG1 = createAsyncThunk(
  'members/approveDependentG1',
  async ({parentId, dependentId }, thunkAPI) => {
    try {
      return await ridsService.approveDependentG1(parentId, dependentId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApproveDependentG1
export const disApproveDependentG1 = createAsyncThunk(
  'members/disApproveDependentG1',
  async ({parentId, dependentId }, thunkAPI) => {
    try {
      return await ridsService.disApproveDependentG1(parentId, dependentId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// deleteDependent
export const deleteDependent = createAsyncThunk(
  'members/deleteDependent',
  async ({parentId, dependentId }, thunkAPI) => {
    try {
      return await ridsService.deleteDependent(parentId, dependentId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// updateMemberPromotion
export const updateMemberPromotion = createAsyncThunk(
  'members/updateMemberPromotion',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await ridsService.updateMemberPromotion(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//editPromotion,
export const editPromotion = createAsyncThunk(
  'members/editPromotion',
  async ({ parentId, formData }, thunkAPI) => {
    try {
      return await ridsService.editPromotion(parentId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// promotionUpload
export const promotionUpload = createAsyncThunk(
  'members/promotionUpload',
  async ({ parentId, promotionId, formData }, thunkAPI) => {
    try {
      return await ridsService.promotionUpload(parentId, promotionId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approvePromotionS1
export const approvePromotionS1 = createAsyncThunk(
  'members/approvePromotionS1',
  async ({parentId, promotionId }, thunkAPI) => {
    try {
      return await ridsService.approvePromotionS1(parentId, promotionId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApprovePromotionS1
export const disApprovePromotionS1 = createAsyncThunk(
  'members/disApprovePromotionS1',
  async ({parentId, promotionId }, thunkAPI) => {
    try {
      return await ridsService.disApprovePromotionS1(parentId, promotionId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approvePromotionG1
export const approvePromotionG1 = createAsyncThunk(
  'members/approvePromotionG1',
  async ({parentId, promotionId }, thunkAPI) => {
    try {
      return await ridsService.approvePromotionG1(parentId, promotionId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApprovePromotionG1
export const disApprovePromotionG1 = createAsyncThunk(
  'members/disApprovePromotionG1',
  async ({parentId, promotionId }, thunkAPI) => {
    try {
      return await ridsService.disApprovePromotionG1(parentId, promotionId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// deletePromotion
export const deletePromotion = createAsyncThunk(
  'members/deletePromotion',
  async ({parentId, promotionId }, thunkAPI) => {
    try {
      return await ridsService.deletePromotion(parentId, promotionId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// updateMemberActivity
export const updateMemberActivity = createAsyncThunk(
  'members/updateMemberActivity',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await ridsService.updateMemberActivity(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//editActivity,
export const editActivity = createAsyncThunk(
  'members/editActivity',
  async ({ parentId, formData }, thunkAPI) => {
    try {
      return await ridsService.editActivity(parentId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// activityUpload
export const activityUpload = createAsyncThunk(
  'members/activityUpload',
  async ({ parentId, activityId, formData }, thunkAPI) => {
    try {
      return await ridsService.activityUpload(parentId, activityId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveActivityS1
export const approveActivityS1 = createAsyncThunk(
  'members/approveActivityS1',
  async ({parentId, activityId }, thunkAPI) => {
    try {
      return await ridsService.approveActivityS1(parentId, activityId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApproveActivityS1
export const disApproveActivityS1 = createAsyncThunk(
  'members/disApproveActivityS1',
  async ({parentId, activityId }, thunkAPI) => {
    try {
      return await ridsService.disApproveActivityS1(parentId, activityId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// approveActivityG1
export const approveActivityG1 = createAsyncThunk(
  'members/approveActivityG1',
  async ({parentId, activityId }, thunkAPI) => {
    try {
      return await ridsService.approveActivityG1(parentId, activityId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// disApproveActivityG1
export const disApproveActivityG1 = createAsyncThunk(
  'members/disApproveActivityG1',
  async ({parentId, activityId }, thunkAPI) => {
    try {
      return await ridsService.disApproveActivityG1(parentId, activityId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// deleteActivity
export const deleteActivity = createAsyncThunk(
  'members/deleteActivity',
  async ({parentId, activityId }, thunkAPI) => {
    try {
      return await ridsService.deleteActivity(parentId, activityId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getDataAndUpdate
export const getDataAndUpdate = createAsyncThunk(
  'members/getDataAndUpdate',
  async ({ id, data }, thunkAPI) => {
    try {
      return await ridsService.getDataAndUpdate(id, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getEducDataAndUpdate
export const getEducDataAndUpdate = createAsyncThunk(
  'members/getEducDataAndUpdate',
  async ({ id, data }, thunkAPI) => {
    try {
      return await ridsService.getEducDataAndUpdate(id, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getTrainingDataAndUpdate
export const getTrainingDataAndUpdate = createAsyncThunk(
  'members/getTrainingDataAndUpdate',
  async ({ id, data }, thunkAPI) => {
    try {
      return await ridsService.getTrainingDataAndUpdate(id, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getAdtDataAndUpdate
export const getAdtDataAndUpdate = createAsyncThunk(
  'members/getAdtDataAndUpdate',
  async ({ id, data }, thunkAPI) => {
    try {
      return await ridsService.getAdtDataAndUpdate(id, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getDesignationDataAndUpdate
export const getDesignationDataAndUpdate = createAsyncThunk(
  'members/getDesignationDataAndUpdate',
  async ({ id, data }, thunkAPI) => {
    try {
      return await ridsService.getDesignationDataAndUpdate(id, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getAwardDataAndUpdate
export const getAwardDataAndUpdate = createAsyncThunk(
  'members/getAwardDataAndUpdate',
  async ({ id, data }, thunkAPI) => {
    try {
      return await ridsService.getAwardDataAndUpdate(id, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getDependentDataAndUpdate
export const getDependentDataAndUpdate = createAsyncThunk(
  'members/getDependentDataAndUpdate',
  async ({ id, data }, thunkAPI) => {
    try {
      return await ridsService.getDependentDataAndUpdate(id, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getPromotionDataAndUpdate
export const getPromotionDataAndUpdate = createAsyncThunk(
  'members/getPromotionDataAndUpdate',
  async ({ id, data }, thunkAPI) => {
    try {
      return await ridsService.getPromotionDataAndUpdate(id, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getActivityDataAndUpdate
export const getActivityDataAndUpdate = createAsyncThunk(
  'members/getActivityDataAndUpdate',
  async ({ id, data }, thunkAPI) => {
    try {
      return await ridsService.getActivityDataAndUpdate(id, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getMembers
export const getMembers = createAsyncThunk(
  'members/getMembers',
  async (_, thunkAPI) => {
    try {
      return await ridsService.getMembers();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// deleteReservist
export const deleteReservist = createAsyncThunk(
  'members/deleteReservist',
  async (id, thunkAPI) => {
    try {
      return await ridsService.deleteReservist(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// updateMemberDerogatory
export const updateMemberDerogatory = createAsyncThunk(
  'members/updateMemberDerogatory',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await ridsService.updateMemberDerogatory(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const memberSlice = createSlice({
  name: 'rids',
  initialState,
  reducers: {
    RESET_MEMBER(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    CLEAR_MEMBER(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
      state.member = null;
      state.education = null;
    },
    CALC_VERIFIED_MEMBER(state, action) {
      const array = [];
      state.members.map((member) => {
        const { isVerified } = member;
        return array.push(isVerified);
      });
      let count = 0;
      array.forEach((item) => {
        if (item === true) {
          count += 1;
        }
      });
      state.verifiedMembers = count;
    }
  },
  extraReducers: (builder) => {
    builder
      // add member
      .addCase(addMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        //console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Member added successfully';
          toast.success('Member added successfully');
        }
      })
      .addCase(addMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // addNewMember
      .addCase(addNewMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        //console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Member added successfully';
          toast.success('Member added successfully');
        }
      })
      .addCase(addNewMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get member
      .addCase(getMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.member = action.payload;
        //console.log(action.payload);
      })
      .addCase(getMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Update member
      .addCase(updateMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Member updated successfully';
          toast.success('Member updated successfully.');
        }
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Update member education
      .addCase(updateMemberEduc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMemberEduc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Member education updated successfully';
          toast.success('Member education updated successfully.');
        }
      })
      .addCase(updateMemberEduc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // deleteCourse
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Edit course education
      .addCase(editEduc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEduc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Course updated successfully';
          toast.success('Course updated successfully.');
        }
      })
      .addCase(editEduc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveCourseS1
      .addCase(approveCourseS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveCourseS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Course approved by S1';
          toast.success('Course approved by S1');
        }
      })
      .addCase(approveCourseS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disApproveCourseS1
      .addCase(disApproveCourseS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApproveCourseS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Course disapproved by S1';
          toast.success('Course disapproved by S1');
        }
      })
      .addCase(disApproveCourseS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveCourseG1
      .addCase(approveCourseG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveCourseG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Course approved by G1';
          toast.success('Course approved by G1');
        }
      })
      .addCase(approveCourseG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      // disApproveCourseG1
      .addCase(disApproveCourseG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApproveCourseG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Course disapproved by G1';
          toast.success('Course disapproved by G1');
        }
      })
      .addCase(disApproveCourseG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // courseUpload
      .addCase(courseUpload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(courseUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Course uploaded successfully.';
          toast.success('Course uploaded successfully.');
        }
      })
      .addCase(courseUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // updateMemberTraining
      .addCase(updateMemberTraining.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMemberTraining.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Military training updated successfully';
          toast.success('Military training updated successfully.');
        }
      })
      .addCase(updateMemberTraining.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Edit course training
      .addCase(editTraining.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTraining.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Training updated successfully.';
          toast.success('Training updated successfully.');
        }
      })
      .addCase(editTraining.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // deleteTraining
      .addCase(deleteTraining.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTraining.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteTraining.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveTrainingS1
      .addCase(approveTrainingS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveTrainingS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Training approved by S1';
          toast.success('Training approved by S1');
        }
      })
      .addCase(approveTrainingS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disApproveTrainingS1
      .addCase(disApproveTrainingS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApproveTrainingS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Training disapproved by S1';
          toast.success('Training disapproved by S1');
        }
      })
      .addCase(disApproveTrainingS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveTrainingG1
      .addCase(approveTrainingG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveTrainingG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Training approved by G1';
          toast.success('Training approved by G1');
        }
      })
      .addCase(approveTrainingG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disApproveTrainingG1
      .addCase(disApproveTrainingG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApproveTrainingG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Training disapproved by g1';
          toast.success('Training disapproved by g1');
        }
      })
      .addCase(disApproveTrainingG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // trainingCourseUpload
      .addCase(trainingCourseUpload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(trainingCourseUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Training course uploaded successfully.';
          toast.success('Training course uploaded successfully.');
        }
      })
      .addCase(trainingCourseUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // updateActiveDuty
      .addCase(updateActiveDuty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateActiveDuty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Active Duty training updated successfully';
          toast.success('Active Duty training updated successfully.');
        }
      })
      .addCase(updateActiveDuty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // editActiveDuty
      .addCase(editActiveDuty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editActiveDuty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'ADT updated successfully.';
          toast.success('ADT updated successfully.');
        }
      })
      .addCase(editActiveDuty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // activeDutyUpload
      .addCase(activeDutyUpload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activeDutyUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'ADT uploaded successfully.';
          toast.success('ADT uploaded successfully.');
        }
      })
      .addCase(activeDutyUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // addReservist
      .addCase(addReservist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReservist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        //console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Reservist added successfully';
          toast.success('Reservist added successfully');
        }
      })
      .addCase(addReservist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // photoUpload
      .addCase(photoUpload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(photoUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Photo uploaded successfully.';
          toast.success('Photo uploaded successfully.');
        }
      })
      .addCase(photoUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveActiveDutyS1
      .addCase(approveActiveDutyS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveActiveDutyS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Active Duty approved by S1';
          toast.success('Active Duty approved by S1');
        }
      })
      .addCase(approveActiveDutyS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disapproveActiveDutyS1
      .addCase(disapproveActiveDutyS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disapproveActiveDutyS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Active Duty disapproved by S1';
          toast.success('Active Duty disapproved by S1');
        }
      })
      .addCase(disapproveActiveDutyS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveActiveDutyG1
      .addCase(approveActiveDutyG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveActiveDutyG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Active Duty approved by G1';
          toast.success('Active Duty approved by G1');
        }
      })
      .addCase(approveActiveDutyG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disapproveActiveDutyG1
      .addCase(disapproveActiveDutyG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disapproveActiveDutyG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Active Duty disapproved by G1';
          toast.success('Active Duty disapproved by G1');
        }
      })
      .addCase(disapproveActiveDutyG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // deleteActiveDuty
      .addCase(deleteActiveDuty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteActiveDuty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteActiveDuty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

     // updateMemberDesignation
      .addCase(updateMemberDesignation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMemberDesignation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Military designation updated successfully';
          toast.success('Military designation updated successfully.');
        }
      })
      .addCase(updateMemberDesignation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // editDesignation
      .addCase(editDesignation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editDesignation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Unit designation updated successfully.';
          toast.success('Unit designation updated successfully.');
        }
      })
      .addCase(editDesignation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // designationUpload
      .addCase(designationUpload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(designationUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Unit designation uploaded successfully.';
          toast.success('Unit designation uploaded successfully.');
        }
      })
      .addCase(designationUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveDesignationS1
      .addCase(approveDesignationS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveDesignationS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Unit Designation approved by S1';
          toast.success('Unit Designation approved by S1');
        }
      })
      .addCase(approveDesignationS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disApproveDesignationS1
      .addCase(disApproveDesignationS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApproveDesignationS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Unit Designation disapproved by S1';
          toast.success('Unit Designation disapproved by S1');
        }
      })
      .addCase(disApproveDesignationS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveDesignationG1
      .addCase(approveDesignationG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveDesignationG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Unit Designation approved by G1';
          toast.success('Unit Designation approved by G1');
        }
      })
      .addCase(approveDesignationG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disApproveDesignationG1
      .addCase(disApproveDesignationG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApproveDesignationG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Unit Designation disapproved by G1';
          toast.success('Unit Designation disapproved by G1');
        }
      })
      .addCase(disApproveDesignationG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // deleteDesignation
      .addCase(deleteDesignation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDesignation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteDesignation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // updateMemberAward
      .addCase(updateMemberAward.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMemberAward.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Award added successfully.';
          toast.success('Award added successfully.');
        }
      })
      .addCase(updateMemberAward.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // editAward
      .addCase(editAward.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAward.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Award updated successfully.';
          toast.success('Award updated successfully.');
        }
      })
      .addCase(editAward.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // awardUpload
      .addCase(awardUpload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(awardUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Award uploaded successfully.';
          toast.success('Award uploaded successfully.');
        }
      })
      .addCase(awardUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveAwardS1
      .addCase(approveAwardS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveAwardS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Award approved by S1';
          toast.success('Award approved by S1');
        }
      })
      .addCase(approveAwardS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disApproveAwardS1
      .addCase(disApproveAwardS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApproveAwardS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Award disapproved by S1';
          toast.success('Award disapproved by S1');
        }
      })
      .addCase(disApproveAwardS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveAwardG1
      .addCase(approveAwardG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveAwardG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Award approved by G1';
          toast.success('Award approved by G1');
        }
      })
      .addCase(approveAwardG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disApproveAwardG1
      .addCase(disApproveAwardG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApproveAwardG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Award disapproved by G1';
          toast.success('Award disapproved by G1');
        }
      })
      .addCase(disApproveAwardG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // deleteAward
      .addCase(deleteAward.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAward.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteAward.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // updateMemberDependent
      .addCase(updateMemberDependent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMemberDependent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Dependent added successfully.';
          toast.success('Dependent added successfully.');
        }
      })
      .addCase(updateMemberDependent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // editDependent
      .addCase(editDependent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editDependent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Dependent details updated successfully.';
          toast.success('Dependent details updated successfully.');
        }
      })
      .addCase(editDependent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // dependentUpload
      .addCase(dependentUpload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(dependentUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Dependent details uploaded successfully.';
          toast.success('Dependent details uploaded successfully.');
        }
      })
      .addCase(dependentUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveDependentS1
      .addCase(approveDependentS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveDependentS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Dependent approved by S1';
          toast.success('Dependent approved by S1');
        }
      })
      .addCase(approveDependentS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disApproveDependentS1
      .addCase(disApproveDependentS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApproveDependentS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Dependent disapproved by S1';
          toast.success('Dependent disapproved by S1');
        }
      })
      .addCase(disApproveDependentS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveDependentG1
      .addCase(approveDependentG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveDependentG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Dependent approved by G1';
          toast.success('Dependent approved by G1');
        }
      })
      .addCase(approveDependentG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disApproveDependentG1
      .addCase(disApproveDependentG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApproveDependentG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Dependent disapproved by G1';
          toast.success('Dependent disapproved by G1');
        }
      })
      .addCase(disApproveDependentG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // deleteDependent
      .addCase(deleteDependent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDependent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteDependent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // updateMemberPromotion
      .addCase(updateMemberPromotion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMemberPromotion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Promotion updated successfully';
          toast.success('Promotion updated successfully.');
        }
      })
      .addCase(updateMemberPromotion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // editPromotion
      .addCase(editPromotion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPromotion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Promotion details updated successfully.';
          toast.success('Promotion details updated successfully.');
        }
      })
      .addCase(editPromotion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // promotionUpload
      .addCase(promotionUpload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(promotionUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Promotion details uploaded successfully.';
          toast.success('Promotion details uploaded successfully.');
        }
      })
      .addCase(promotionUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approvePromotionS1
      .addCase(approvePromotionS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approvePromotionS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Promotion approved by S1';
          toast.success('Promotion approved by S1');
        }
      })
      .addCase(approvePromotionS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disApprovePromotionS1
      .addCase(disApprovePromotionS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApprovePromotionS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Promotion disapproved by S1';
          toast.success('Promotion disapproved by S1');
        }
      })
      .addCase(disApprovePromotionS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approvePromotionG1
      .addCase(approvePromotionG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approvePromotionG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Promotion approved by G1';
          toast.success('Promotion approved by G1');
        }
      })
      .addCase(approvePromotionG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disApprovePromotionG1
      .addCase(disApprovePromotionG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApprovePromotionG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Promotion disapproved by G1';
          toast.success('Promotion disapproved by G1');
        }
      })
      .addCase(disApprovePromotionG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // deletePromotion
      .addCase(deletePromotion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePromotion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deletePromotion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // updateMemberActivity
      .addCase(updateMemberActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMemberActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Activity added successfully.';
          toast.success('Activity added successfully.');
        }
      })
      .addCase(updateMemberActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // editActivity
      .addCase(editActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Military activity updated successfully.';
          toast.success('Military activity updated successfully.');
        }
      })
      .addCase(editActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // activityUpload
      .addCase(activityUpload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activityUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Military activity uploaded successfully.';
          toast.success('Military activity uploaded successfully.');
        }
      })
      .addCase(activityUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveActivityS1
      .addCase(approveActivityS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveActivityS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Military activity approved by S1';
          toast.success('Military activity approved by S1');
        }
      })
      .addCase(approveActivityS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disApproveActivityS1
      .addCase(disApproveActivityS1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApproveActivityS1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Military activity disapproved by S1';
          toast.success('Military activity disapproved by S1');
        }
      })
      .addCase(disApproveActivityS1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // approveActivityG1
      .addCase(approveActivityG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveActivityG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Military activity approved by G1';
          toast.success('Military activity approved by G1');
        }
      })
      .addCase(approveActivityG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // disApproveActivityG1
      .addCase(disApproveActivityG1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disApproveActivityG1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Military activity disapproved by G1';
          toast.success('Military activity disapproved by G1');
        }
      })
      .addCase(disApproveActivityG1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // deleteActivity
      .addCase(deleteActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getDataAndUpdate
      .addCase(getDataAndUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataAndUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'New data update!';
          toast.success('New data update!');
        }
      })
      .addCase(getDataAndUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getEducDataAndUpdate
      .addCase(getEducDataAndUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEducDataAndUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'New education data updated!';
          toast.success('New education data updated!');
        }
      })
      .addCase(getEducDataAndUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getTrainingDataAndUpdate
      .addCase(getTrainingDataAndUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainingDataAndUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'New training data updated!';
          toast.success('New training data updated!');
        }
      })
      .addCase(getTrainingDataAndUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getAdtDataAndUpdate
      .addCase(getAdtDataAndUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdtDataAndUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'New adt data updated!';
          toast.success('New adt data updated!');
        }
      })
      .addCase(getAdtDataAndUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getDesignationDataAndUpdate
      .addCase(getDesignationDataAndUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDesignationDataAndUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'New designation data updated!';
          toast.success('New designation data updated!');
        }
      })
      .addCase(getDesignationDataAndUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getAwardDataAndUpdate
      .addCase(getAwardDataAndUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAwardDataAndUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'New award data inserted!';
          toast.success('New award data inserted!');
        }
      })
      .addCase(getAwardDataAndUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getDependentDataAndUpdate
      .addCase(getDependentDataAndUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDependentDataAndUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'New dependent data inserted!';
          toast.success('New dependent data inserted!');
        }
      })
      .addCase(getDependentDataAndUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getPromotionDataAndUpdate
      .addCase(getPromotionDataAndUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPromotionDataAndUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'New promotion data updated!';
          toast.success('New promotion data updated!');
        }
      })
      .addCase(getPromotionDataAndUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getActivityDataAndUpdate
      .addCase(getActivityDataAndUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActivityDataAndUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'New activity data updated!';
          toast.success('New activity data updated!');
        }
      })
      .addCase(getActivityDataAndUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // getMembers
      .addCase(getMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // deleteReservist
      .addCase(deleteReservist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReservist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Reservist deleted successfully';
          toast.success('Reservist deleted successfully');
        }
      })
      .addCase(deleteReservist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // updateMemberDerogatory
      .addCase(updateMemberDerogatory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMemberDerogatory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Complaint added successfully.';
          toast.success('Complaint added successfully.');
        }
      })
      .addCase(updateMemberDerogatory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
      
  }
});

export const { RESET_MEMBER, CLEAR_MEMBER, CALC_VERIFIED_MEMBER } = memberSlice.actions;

export const selectMember = (state) => state.rids.member;
export const selectIsLoading = (state) => state.rids.isLoading;

export default memberSlice.reducer;
