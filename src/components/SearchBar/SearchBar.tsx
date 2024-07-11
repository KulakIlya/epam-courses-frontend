import { FC } from 'react';

import Button from '../Button';
import Input from '../Input';

import styles from './SearchBar.module.css';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
  return (
    <form className={styles.form}>
      <Input name="search" type="text" />
      <Button type="submit">Search</Button>
    </form>
  );
};
export default SearchBar;
