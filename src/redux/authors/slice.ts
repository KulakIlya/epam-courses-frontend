import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './authors.types';
import { deleteAuthor, fetchAllAuthors } from './operations';

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
      .addCase(deleteAuthor.fulfilled, (state, { payload }) => {
        state.list = state.list.filter(item => item.id !== payload.id);
      }),
});

export const authorsReducer = authorsSlice.reducer;
export const { resetAuthors } = authorsSlice.actions;
