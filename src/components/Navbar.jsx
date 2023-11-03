import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

function Navbar() {
  const { isAuth, user, logoutUser } = useAuth();

  return (
    <nav className="flex items-center justify-between p-5 bg-gray-900">
      <Link to="/" className="sm:text-2xl text-xl font-bold">
        <h1>Tasks Manager</h1>
      </Link>
      <ul className="sm:text-xl flex items-center gap-5 text-lg">
        {isAuth ? (
          <>
            <li>Welcome user {user.username}</li>
            <li>
              <Link
                to="/add-task"
                className="hover:bg-indigo-600 px-4 py-2 transition-colors bg-indigo-700 rounded"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"
                className="hover:bg-indigo-600 px-4 py-2 transition-colors rounded"
              >
                Tasks
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => logoutUser()}
                className="hover:bg-indigo-600 px-4 py-2 transition-colors rounded"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/register"
                className="hover:bg-indigo-600 px-4 py-2 transition-colors bg-indigo-700 rounded"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:bg-indigo-600 px-4 py-2 transition-colors rounded"
              >
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
