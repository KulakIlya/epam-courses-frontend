import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './authors.types';
import { addAuthors, deleteAuthor, fetchAllAuthors } from './operations';

const initialState: InitialState = {
  list: [],
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    resetAuthors: state => {
      state.list = [];
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchAllAuthors.fulfilled, (state, { payload }) => {
        state.list = payload;
      })
      .addCase(addAuthors.fulfilled, (state, { payload }) => {
        state.list.push(...payload);
      })
      .addCase(deleteAuthor.fulfilled, (state, { payload }) => {
        state.list = state.list.filter(item => item._id !== payload._id);
      }),
});

export const authorsReducer = authorsSlice.reducer;
export const { resetAuthors } = authorsSlice.actions;
