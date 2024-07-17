import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import { setAuthToken } from '../../services/axios.config';
import userService from '../../services/userService';
import {
  AsyncThunkConfig,
  ErrorResponse,
  FetchUserResponse,
  LoginSuccess,
  LogoutSuccess,
  UserToLogin,
} from './user.types';

export const login = createAsyncThunk<LoginSuccess, UserToLogin, AsyncThunkConfig>(
  'user/login',
  async (userToLogin, thunkAPI) => {
    try {
      const { data } = await userService.loginUser(userToLogin);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError<ErrorResponse>).response!.data.message);
    }
  }
);

export const logout = createAsyncThunk<LogoutSuccess, undefined, AsyncThunkConfig>(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      const { data } = await userService.logoutUser();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError<ErrorResponse>).response!.data.message);
    }
  }
);

export const fetchUser = createAsyncThunk<FetchUserResponse, undefined, AsyncThunkConfig>(
  'user/me',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().users.token;

    setAuthToken(token);
    try {
      const {
        data: { data },
      } = await userService.fetchUser();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as AxiosError<ErrorResponse>).response!.data.message);
    }
  }
);
