import { FC } from 'react';
import { RotatingLines } from 'react-loader-spinner';

import styles from './Loader.module.css';

const Loader: FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <RotatingLines
        visible={true}
        strokeColor="#007298"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};
export default Loader;
