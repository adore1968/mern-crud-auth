import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
import TaskProvider from "../context/tasks/TaskProvider";
import Loader from "../components/Loader";

function ProtectedRoute() {
  const { isAuth, user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !isAuth && !user) return <Navigate to="/login" replace />;

  return (
    <TaskProvider>
      <Outlet />
    </TaskProvider>
  );
}

export default ProtectedRoute;
