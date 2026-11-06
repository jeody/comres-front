import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import rankService from './rankService';

const initialState = {
  rank: null,
  ranks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Create New Rank
export const createRank = createAsyncThunk(
  'ranks/createRank',
  async (formData, thunkAPI) => {
    try {
      return await rankService.createRank(formData);
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

// Get all Ranks
export const getRanks = createAsyncThunk(
  'ranks/getRanks',
  async (_, thunkAPI) => {
    try {
      return await rankService.getRanks();
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

// Delete Rank
export const deleteRank = createAsyncThunk(
  'ranks/deleteRank',
  async (id, thunkAPI) => {
    try {
      return await rankService.deleteRank(id);
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

// Get Rank
export const getRank = createAsyncThunk(
  'ranks/getRank',
  async (id, thunkAPI) => {
    try {
      return await rankService.getRank(id);
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

// Update Rank
export const updateRank = createAsyncThunk(
  'ranks/updateRank',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await rankService.updateRank(id, formData);
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

const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    RESET_RANK(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // create rank
      .addCase(createRank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        //console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Rank added successfully';
          toast.success('Rank added successfully');
        }
      })
      .addCase(createRank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // get Ranks
      .addCase(getRanks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRanks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.ranks = action.payload;
      })
      .addCase(getRanks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Delete rank
      .addCase(deleteRank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Rank deleted successfully.');
      })
      .addCase(deleteRank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get rank
      .addCase(getRank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.rank = action.payload;
      })
      .addCase(getRank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Update rank
      .addCase(updateRank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        if (action.payload && action.payload.hasOwnProperty('message')) {
          toast.error(action.payload.message);
        } else {
          state.message = 'Rank updated successfully';
          toast.success('Rank updated successfully.');
        }
      })
      .addCase(updateRank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  }
});

export const { RESET_RANK } = rankSlice.actions;

export const selectRank = (state) => state.rank.rank;
export const selectIsLoading = (state) => state.rank.isLoading;

export default rankSlice.reducer;