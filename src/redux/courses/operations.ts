import { createAsyncThunk } from '@reduxjs/toolkit';

import courseService from '../../services/coursesService';
import { AsyncThunkConfig, ErrorResponse } from '../user/user.types';
import { Course, CourseToAdd, CourseToUpdate } from './courses.types';

export const fetchAllCourses = createAsyncThunk<Course[], undefined, AsyncThunkConfig>(
  'courses/all',
  async (_, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await courseService.fetchAll();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as ErrorResponse).message);
    }
  }
);

export const addCourse = createAsyncThunk<Course, CourseToAdd, AsyncThunkConfig>(
  'courses/add',
  async (courseToAdd, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await courseService.addCourse(courseToAdd);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as ErrorResponse).message);
    }
  }
);

export const updateCourse = createAsyncThunk<Course, CourseToUpdate, AsyncThunkConfig>(
  'course/update',
  async (courseToUpdate, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await courseService.updateCourse(courseToUpdate);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as ErrorResponse).message);
    }
  }
);

export const deleteCourse = createAsyncThunk<string, string, AsyncThunkConfig>(
  'courses/delete',
  async (id, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await courseService.deleteCourse(id);
      return (data as Course)._id;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as ErrorResponse).message);
    }
  }
);
