import { FC } from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { Author } from '../../redux/authors/authors.types';
import { OnAddAuthor, OnRemoveAuthor } from '../AuthorsList/AuthorsList.types';
import styles from './AuthorsItem.module.css';

interface AuthorsItemProps {
  author: Author | string;
  type: 'add' | 'remove';
  onAddAuthor?: OnAddAuthor;
  onRemoveAuthor?: OnRemoveAuthor;
}

const AuthorsItem: FC<AuthorsItemProps> = ({ author, type, onAddAuthor, onRemoveAuthor }) => {
  return (
    <li className={styles.item}>
      {typeof author === 'object' ? author.name : author}
      <button
        type="button"
        className={styles.button}
        onClick={() =>
          onAddAuthor
            ? onAddAuthor(typeof author === 'object' ? author.name : author)
            : onRemoveAuthor!(typeof author === 'object' ? author._id : author)
        }
      >
        {type === 'add' && <span>+</span>}
        {type === 'remove' && <FiTrash2 size="12px" />}
      </button>
    </li>
  );
};
export default AuthorsItem;
