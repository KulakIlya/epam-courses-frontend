import { FC, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppBar from '../AppBar';

import { useAppSelector } from '../../redux/hooks';
import { selectIsLoading } from '../../redux/user/selectors';
import styles from './SharedLayout.module.css';

interface SharedLayoutProps {
  children: ReactNode;
}

const SharedLayout: FC<SharedLayoutProps> = ({ children }) => {
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <>
      <AppBar />
      <main className={styles.mainContent}>
        {isLoading ? <p>Loading...</p> : <div className="container">{children}</div>}
      </main>
      <ToastContainer position="top-right" />
    </>
  );
};
export default SharedLayout;
