import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/auth/AuthContext";
import Loader from "./components/Loader";

function ProtectedRoute() {
  const { user, isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!user && !isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
