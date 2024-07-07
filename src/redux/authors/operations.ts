import { createAsyncThunk } from '@reduxjs/toolkit';

import authorService from '../../services/authorsService';
import { AsyncThunkConfig, ErrorResponse } from '../user/user.types';
import { Author } from './authors.types';

export const fetchAllAuthors = createAsyncThunk<Author[], undefined, AsyncThunkConfig>(
  'authors/all',
  async (_, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await authorService.fetchAllAuthors();
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
      } = await authorService.deleteAuthor(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as ErrorResponse).message);
    }
  }
);
