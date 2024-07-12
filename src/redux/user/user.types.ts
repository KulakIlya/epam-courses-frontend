import { AppDispatch, RootState } from '../store';

export interface InitialState {
  username: string;
  email: string;
  token: string;
  isLoggedIn: boolean;
  isLoading: boolean;
}

export interface AsyncThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;

  rejectedMeta?: unknown;
}

export interface SuccessResponse<T extends object> {
  data: T;
}

export interface ErrorResponse {
  message: string;
}

// Registration

export interface UserToRegister {
  name: string;
  email: string;
  password: string;
}

export interface RegisterSuccess {}

// Login

export interface UserToLogin {
  email: string;
  password: string;
}

export interface LoginSuccess {
  token: string;
}

// Logout

export interface LogoutSuccess {}

// Fetch user
export interface FetchUserResponse {
  email: string;
  name: string;
}
