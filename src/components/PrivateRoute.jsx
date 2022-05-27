import { Navigate, useLocation, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const location = useLocation();
  const user = false;

  return user ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
