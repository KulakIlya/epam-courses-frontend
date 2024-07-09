import { FC } from 'react';

import LoginForm from '../../components/LoginForm';
import styles from './LoginPage.module.css';

const LoginPage: FC = () => {
  return (
    <div className="container">
      <h2 className={styles.title}>Login</h2>
      <LoginForm />
    </div>
  );
};
export default LoginPage;
