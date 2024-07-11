import { addLeadingZero } from './addLeadingZero';

export const convertTime = (date: number): string => {
  const hours = (date / 60).toFixed();
  const minutes = Math.round(date % 60);

  return addLeadingZero(`${hours}:${minutes}`);
};
