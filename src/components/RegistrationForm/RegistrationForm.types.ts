import { FieldValues } from 'react-hook-form';

export interface Inputs extends FieldValues {
  name: string;
  email: string;
  password: string;
}
