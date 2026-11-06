import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import branchOfServices from './branchOfServices';

const initialState = {
  branchOfServices: [],
  purposes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Create New branchOfService
export const createBranchOfService = createAsyncThunk(
  'branchOfService/create',
  async (formData, thunkAPI) => {
    try {
      return await branchOfServices.createBranchOfService(formData);
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

// Get All BranceOfServices
export const getBranchOfServices = createAsyncThunk(
  'branchOfService/getBranchOfServices',
  async (_, thunkAPI) => {
    try {
      return await branchOfServices.getBranchOfServices();
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

// Delete a branchOfService
export const deleteBranchOfService = createAsyncThunk(
  'branchOfService/delete',
  async (slug, thunkAPI) => {
    try {
      return await branchOfServices.deleteBranchOfService(slug);
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

const branchOfServiceSlice = createSlice({
  name: 'branchOfServices',
  initialState,
  reducers: {
    RESET_BRSVC(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.branchOfServices = [];
      state.purposes = [];
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // create cat
      .addCase(createBranchOfService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBranchOfService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        //console.log(action.payload);
        toast.success('Branch of Service created successfully');
      })
      .addCase(createBranchOfService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get all BranceOfServices
      .addCase(getBranchOfServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBranchOfServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.branchOfServices = action.payload;
        // console.log(action.payload);
      })
      .addCase(getBranchOfServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      //   Delete branchOfService
      .addCase(deleteBranchOfService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBranchOfService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
        //console.log(action.payload);
      })
      .addCase(deleteBranchOfService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  }
});

export const { RESET_BRSVC } = branchOfServiceSlice.actions;

export default branchOfServiceSlice.reducer;
