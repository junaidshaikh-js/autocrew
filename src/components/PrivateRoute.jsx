import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = () => {
  const location = useLocation();
  const { token } = useSelector((store) => store.authDetail);

  return token ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
