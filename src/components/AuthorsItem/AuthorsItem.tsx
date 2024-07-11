import { FC } from 'react';

import Icon from '../../common/Icon';
import styles from './AuthorsItem.module.css';

interface AuthorsItemProps {
  author: {
    name: string;
    id: string;
  };
  type: 'add' | 'remove';
}

const AuthorsItem: FC<AuthorsItemProps> = ({ author: { name }, type }) => {
  return (
    <li className={styles.item}>
      {name}
      <button type="button" className={styles.button}>
        {type === 'add' && <span>+</span>}
        {type === 'remove' && (
          <Icon iconName="bin-2" size={{ width: 12, height: 12 }} strokeColor="black" />
        )}
      </button>
    </li>
  );
};
export default AuthorsItem;
