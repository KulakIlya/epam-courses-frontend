export const addLeadingZero = (time: string) =>
  time
    .split(':')
    .map(item => item.padStart(2, '0'))
    .join(':');
