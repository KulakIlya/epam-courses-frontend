import { createAsyncThunk } from '@reduxjs/toolkit';

import authorsService from '../../services/authorsService';
import { AsyncThunkConfig, ErrorResponse } from '../user/user.types';
import { Author } from './authors.types';

export const fetchAllAuthors = createAsyncThunk<Author[], undefined, AsyncThunkConfig>(
  'authors/all',
  async (_, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await authorsService.fetchAllAuthors();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as ErrorResponse).message);
    }
  }
);

export const addAuthors = createAsyncThunk<Author[], string[], AsyncThunkConfig>(
  'authors/addMany',
  async (names, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await authorsService.addAuthors(names);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as ErrorResponse).message);
    }
  }
);

export const deleteAuthor = createAsyncThunk<Author, string, AsyncThunkConfig>(
  'authors/delete',
  async (id, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await authorsService.deleteAuthor(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as ErrorResponse).message);
    }
  }
);
