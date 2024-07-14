import { Course, CourseToAdd, CourseToUpdate } from '../redux/courses/courses.types';
import { SuccessResponse } from '../redux/user/user.types';
import { coursesClient } from './axios.config';

const fetchAll = () => coursesClient.get<SuccessResponse<Course[]>>('/all');

const fetchCourse = (id: string) => coursesClient.get<SuccessResponse<Course>>(`/${id}`);

const addCourse = (courseToAdd: CourseToAdd) =>
  coursesClient.post<SuccessResponse<Course>>('/add', courseToAdd);

const updateCourse = ({ id, ...rest }: CourseToUpdate) =>
  coursesClient.patch<SuccessResponse<Course>>(`/${id}`, rest);

const deleteCourse = (id: string) => coursesClient.delete<SuccessResponse<Course>>(`/${id}`);

export default { fetchAll, fetchCourse, addCourse, updateCourse, deleteCourse };
