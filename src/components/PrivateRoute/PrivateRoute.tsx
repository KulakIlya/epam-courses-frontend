import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectToken } from '../../redux/user/selectors';

interface PrivateRouteProps {
  element: ReactElement;
  redirectTo: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ element, redirectTo }) => {
  const token = useAppSelector(selectToken);

  return token ? element : <Navigate to={redirectTo} />;
};
export default PrivateRoute;
