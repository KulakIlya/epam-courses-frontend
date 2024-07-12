import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../../assets/images/logo.svg?react';

import Button from '../Button';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/user/operations';
import { selectIsLoading, selectIsLoggedIn } from '../../redux/user/selectors';
import styles from './AppBar.module.css';

const AppBar: FC = () => {
  const location = useLocation();

  const isLoading = useAppSelector(selectIsLoading);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  const handleLogout = () => dispatch(logout());

  return (
    <header className={styles.header}>
      <div className="container">
        <Link to="/">
          <Logo />
        </Link>
        <div className={styles.wrapper}>
          {location.pathname !== '/login' && location.pathname !== '/registration' && (
            <>
              <p>Harry Potter</p>
              <div>
                {isLoggedIn ? (
                  <Button type="button" disabled={isLoading} onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button redirectTo="/login" disabled={isLoading}>
                    Login
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default AppBar;
