import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './courses.types';
import { addCourse, deleteCourse, fetchAllCourses, updateCourse } from './operations';

const initialState: InitialState = {
  list: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    resetCourses: state => {
      state.list = [];
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchAllCourses.fulfilled, (state, { payload }) => {
        state.list = payload;
      })
      .addCase(addCourse.fulfilled, (state, { payload }) => {
        state.list.push(payload);
      })
      .addCase(updateCourse.fulfilled, (state, { payload }) => {
        const indexToUpdate = state.list.findIndex(item => item.id === payload.id);
        state.list[indexToUpdate] = payload;
      })
      .addCase(deleteCourse.fulfilled, (state, { payload }) => {
        state.list = state.list.filter(item => item.id !== payload);
      }),
});

export const coursesReducer = coursesSlice.reducer;
export const { resetCourses } = coursesSlice.actions;
