import { RootState } from '../store';

export const selectUsername = (state: RootState) => state.users.username;
export const selectEmail = (state: RootState) => state.users.email;
export const selectToken = (state: RootState) => state.users.token;
export const selectIsLoggedIn = (state: RootState) => state.users.isLoggedIn;
