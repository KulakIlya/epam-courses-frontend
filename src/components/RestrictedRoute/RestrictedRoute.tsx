import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { selectToken } from '../../redux/user/selectors';

interface RestrictedRouteProps {
  redirectTo: string;
  element: ReactElement;
}

const RestrictedRoute: FC<RestrictedRouteProps> = ({ redirectTo, element }) => {
  const token = useAppSelector(selectToken);

  return token ? <Navigate to={redirectTo} /> : element;
};
export default RestrictedRoute;
