import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredUsers: [],
  filteredStudents: []
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_USERS(state, action) {
      const { users, search } = action.payload;
      const tempUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredUsers = tempUsers;
    },
    FILTER_STUDENTS(state, action) {
      const { students, search } = action.payload;
      const tempStudents = students.filter(
        (student) =>
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.email.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredStudents = tempStudents;
    }
  }
});

export const { FILTER_USERS, FILTER_STUDENTS } = filterSlice.actions;

export const selectUsers = (state) => state.filter.filteredUsers;
export const selectStudents = (state) => state.filter.filteredStudents;

export default filterSlice.reducer;
