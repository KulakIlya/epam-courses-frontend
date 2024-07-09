import { FC } from 'react';
import RegistrationForm from '../../components/RegistrationForm';

import styles from './RegistrationPage.module.css';

const RegistrationPage: FC = () => {
  return (
    <div className="container">
      <h2 className={styles.title}>Registration</h2>
      <RegistrationForm />
    </div>
  );
};
export default RegistrationPage;
