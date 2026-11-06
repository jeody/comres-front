import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice';
import filterReducer from '../redux/features/auth/filterSlice';
import ridsReducer from '../redux/features/rids/ridsSlice';
import branchOfServiceReducer from '../redux/features/branchOfService/brsvcOfServiceSlice';
import rankReducer from '../redux/features/rank/rankSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    rids: ridsReducer,
    branchOfService: branchOfServiceReducer,
    rank: rankReducer,
  }
});
