import { Course, CourseToAdd, CourseToUpdate } from '../redux/courses/courses.types';
import { SuccessResponse } from '../redux/user/user.types';
import { coursesClient } from './axios.config';

const fetchAll = () => coursesClient.get<SuccessResponse<Course[]>>('/all');

const fetchCourse = (id: string) => coursesClient.get<SuccessResponse<Course>>(`/${id}`);

const addCourse = (courseToAdd: CourseToAdd) =>
  coursesClient.post<SuccessResponse<Course>>('/add', courseToAdd);

const updateCourse = ({ _id, ...rest }: CourseToUpdate) =>
  coursesClient.patch<SuccessResponse<Course>>(`/${_id}`, rest);

const deleteCourse = (_id: string) => coursesClient.delete<SuccessResponse<Course>>(`/${_id}`);

export default { fetchAll, fetchCourse, addCourse, updateCourse, deleteCourse };
