import { createSlice } from '@reduxjs/toolkit';

import { Author, InitialState } from './authors.types';
import { addAuthors, deleteAuthor, fetchAllAuthors } from './operations';

const initialState: InitialState = {
  list: null,
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    resetAuthors: state => {
      state.list = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchAllAuthors.fulfilled, (state, { payload }) => {
        state.list = payload;
      })
      .addCase(addAuthors.fulfilled, (state, { payload }) => {
        const newAuthors = payload.filter(
          ({ _id }) => !(state.list as Author[]).find(item => item._id === _id)
        );

        (state.list as Author[]).push(...newAuthors);
      })
      .addCase(deleteAuthor.fulfilled, (state, { payload }) => {
        state.list = (state.list as Author[]).filter(item => item._id !== payload._id);
      }),
});

export const authorsReducer = authorsSlice.reducer;
export const { resetAuthors } = authorsSlice.actions;
