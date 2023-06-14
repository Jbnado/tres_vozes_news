import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks";

export default function PrivateRoute({ children }: { children?: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
}
