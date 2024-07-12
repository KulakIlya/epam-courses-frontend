import {
  FetchUserResponse,
  LoginSuccess,
  LogoutSuccess,
  RegisterSuccess,
  SuccessResponse,
  UserToLogin,
  UserToRegister,
} from '../redux/user/user.types';
import { userClient } from './axios.config';

const registerUser = (userToRegister: UserToRegister) =>
  userClient.post<SuccessResponse<RegisterSuccess>>('/register', userToRegister);

const loginUser = (userToLogin: UserToLogin) =>
  userClient.post<LoginSuccess>('/login', userToLogin);

const logoutUser = () => userClient.delete<SuccessResponse<LogoutSuccess>>('/logout');

const fetchUser = () => userClient.get<SuccessResponse<FetchUserResponse>>('/me');

export default { registerUser, loginUser, logoutUser, fetchUser };
