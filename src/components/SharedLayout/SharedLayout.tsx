import { FC, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppBar from '../AppBar';

import styles from './SharedLayout.module.css';

interface SharedLayoutProps {
  children: ReactNode;
}

const SharedLayout: FC<SharedLayoutProps> = ({ children }) => {
  return (
    <>
      <AppBar />
      <main className={styles.mainContent}>
        <div className="container">{children}</div>
      </main>
      <ToastContainer position="top-right" />
    </>
  );
};
export default SharedLayout;
