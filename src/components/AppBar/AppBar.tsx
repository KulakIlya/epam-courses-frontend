import { FC } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/logo.svg?react';

import Button from '../Button';

import styles from './AppBar.module.css';

const AppBar: FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <Link to="/">
          <Logo />
        </Link>
        <div className={styles.wrapper}>
          <p>Harry Potter</p>
          <div>
            <Button type="button">Logout</Button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default AppBar;
