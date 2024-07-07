import { RootState } from '../store';

export const selectCourseList = (state: RootState) => state.courses.list;
