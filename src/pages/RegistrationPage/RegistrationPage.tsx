import { FC } from 'react';
import RegistrationForm from '../../components/RegistrationForm';

import styles from './RegistrationPage.module.css';

const RegistrationPage: FC = () => {
  return (
    <>
      <h2 className={styles.title}>Registration</h2>
      <RegistrationForm />
    </>
  );
};
export default RegistrationPage;
