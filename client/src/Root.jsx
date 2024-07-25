import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/auth/AuthProvider";
import TaskProvider from "./context/tasks/TaskProvider";

function Root() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Navbar />
        <main className="container px-10 mx-auto">
          <Outlet />
        </main>
      </TaskProvider>
    </AuthProvider>
  );
}

export default Root;
