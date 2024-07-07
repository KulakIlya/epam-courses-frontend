import { CourseToAdd, CourseToUpdate } from '../redux/courses/courses.types';
import { coursesClient } from './axios.config';

const fetchAll = () => coursesClient.get('/all');

const fetchCourse = (id: string) => coursesClient.get(`/${id}`);

const addCourse = (courseToAdd: CourseToAdd) => coursesClient.post('/add', courseToAdd);

const updateCourse = ({ id, ...rest }: CourseToUpdate) => coursesClient.patch(`/${id}`, rest);

const deleteCourse = (id: string) => coursesClient.delete(`/${id}`);

export default { fetchAll, fetchCourse, addCourse, updateCourse, deleteCourse };
