import { UserToLogin, UserToRegister } from '../redux/user/user.types';
import { userClient } from './axios.config';

const registerUser = (userToRegister: UserToRegister) =>
  userClient.post('/register', userToRegister);

const loginUser = (userToLogin: UserToLogin) => userClient.post('/login', userToLogin);

const logoutUser = () => userClient.delete('/logout');

const fetchUser = () => userClient.get('/me');

export default { registerUser, loginUser, logoutUser, fetchUser };
