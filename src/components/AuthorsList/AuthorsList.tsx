import { FC } from 'react';
import { Author } from '../../redux/authors/authors.types';
import AuthorsItem from '../AuthorsItem/AuthorsItem';

interface AuthorsListProps {
  list: Author[];
  type: 'add' | 'remove';
}

const AuthorsList: FC<AuthorsListProps> = ({ list, type }) => {
  return (
    <ul>
      {list.map(item => (
        <AuthorsItem author={item} type={type} />
      ))}
    </ul>
  );
};
export default AuthorsList;
