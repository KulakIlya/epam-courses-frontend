import { authorsClient } from './axios.config';

const fetchAllAuthors = () => authorsClient.get('/all');

const deleteAuthor = (id: string) => authorsClient.delete(`/${id}`);

export default { fetchAllAuthors, deleteAuthor };
