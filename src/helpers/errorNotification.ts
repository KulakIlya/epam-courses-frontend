import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ErrorResponse } from '../redux/user/user.types';

const errorNotification = ({ response }: AxiosError<ErrorResponse>) =>
  toast.error(response?.data.message);

export default errorNotification;
