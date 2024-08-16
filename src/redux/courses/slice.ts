import { createSlice } from '@reduxjs/toolkit';

import { Course, InitialState } from './courses.types';
import { addCourse, deleteCourse, fetchAllCourses, updateCourse } from './operations';

const initialState: InitialState = {
  list: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    resetCourses: state => {
      state.list = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchAllCourses.fulfilled, (state, { payload }) => {
        state.list = payload;
      })
      .addCase(addCourse.fulfilled, (state, { payload }) => {
        (state.list as Course[]).push(payload);
      })
      .addCase(updateCourse.fulfilled, (state, { payload }) => {
        const indexToUpdate = (state.list as Course[]).findIndex(item => item._id === payload._id);
        (state.list as Course[])[indexToUpdate] = payload;
      })
      .addCase(deleteCourse.fulfilled, (state, { payload }) => {
        state.list = (state.list as Course[]).filter(item => item._id !== payload);
      }),
});

export const coursesReducer = coursesSlice.reducer;
export const { resetCourses } = coursesSlice.actions;
