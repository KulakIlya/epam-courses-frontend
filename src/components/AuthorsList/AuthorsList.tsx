import { FC } from 'react';
import { Author } from '../../redux/authors/authors.types';
import AuthorsItem from '../AuthorsItem/AuthorsItem';
import { OnAddAuthor, OnRemoveAuthor } from './AuthorsList.types';

interface AuthorsListProps {
  list: Author[] | (string | undefined)[];
  type: 'add' | 'remove';
  onAddAuthor?: OnAddAuthor;
  onRemoveAuthor?: OnRemoveAuthor;
}

const AuthorsList: FC<AuthorsListProps> = ({ list, type, onAddAuthor, onRemoveAuthor }) => {
  return (
    <ul>
      {list.length &&
        list.map(item => (
          <AuthorsItem
            author={item!}
            type={type}
            key={typeof item === 'object' ? item._id : item}
            onAddAuthor={onAddAuthor}
            onRemoveAuthor={onRemoveAuthor}
          />
        ))}
    </ul>
  );
};
export default AuthorsList;
