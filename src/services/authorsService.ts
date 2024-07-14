import { Author } from '../redux/authors/authors.types';
import { SuccessResponse } from '../redux/user/user.types';
import { authorsClient } from './axios.config';

const fetchAllAuthors = () => authorsClient.get<SuccessResponse<Author[]>>('/all');

const fetchAuthor = (id: string) => authorsClient.get<SuccessResponse<Author>>(`/${id}`);

const addAuthors = (names: string[]) =>
  authorsClient.post<SuccessResponse<Author[]>>('/add/many', { names });

const deleteAuthor = (id: string) => authorsClient.delete(`/${id}`);

export default { fetchAllAuthors, deleteAuthor, fetchAuthor, addAuthors };
