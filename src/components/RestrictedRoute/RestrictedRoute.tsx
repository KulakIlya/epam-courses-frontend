import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectIsLoggedIn } from '../../redux/user/selectors';

interface RestrictedRouteProps {
  redirectTo: string;
  element: ReactElement;
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({ redirectTo, element }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : element;
};
export default RestrictedRoute;
