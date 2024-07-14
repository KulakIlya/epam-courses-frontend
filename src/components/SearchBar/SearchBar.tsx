import { FC } from 'react';

import Button from '../Button';
import Input from '../Input';

import { FormProvider, useForm } from 'react-hook-form';
import { HandleFilter } from '../../pages/CoursesPage/CoursesPage.type';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: HandleFilter;
}

interface Inputs {
  filter: string;
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  const methods = useForm<Inputs>();

  const handleSubmit = (data: { filter: string }) => onSubmit(data.filter);

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(handleSubmit)}>
        <Input name="filter" type="text" />
        <Button type="submit">Search</Button>
      </form>
    </FormProvider>
  );
};
export default SearchBar;
