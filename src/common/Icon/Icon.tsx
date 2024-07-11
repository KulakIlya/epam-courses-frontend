import { FC } from 'react';

import sprite from '../../assets/images/sprite.svg';

import styles from './Icon.module.css';

interface IconProps {
  iconName: string;
  fillColor?: string;
  size: {
    width: number;
    height: number;
  };
  strokeColor?: string;
}

const Icon: FC<IconProps> = ({ iconName, fillColor, size, strokeColor }) => {
  return (
    <svg className={styles.icon} style={{ fill: fillColor, stroke: strokeColor }} {...size}>
      <use href={`${sprite}#icon-${iconName}`}></use>
    </svg>
  );
};
export default Icon;
