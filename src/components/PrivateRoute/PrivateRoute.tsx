import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectIsLoggedIn } from '../../redux/user/selectors';

interface PrivateRouteProps {
  element: ReactElement;
  redirectTo: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ element, redirectTo }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? element : <Navigate to={redirectTo} />;
};
export default PrivateRoute;
