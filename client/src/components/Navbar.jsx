import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

function Navbar() {
  const { isAuth, user, logout } = useAuth();

  return (
    <nav className="bg-zinc-700 flex items-center justify-between px-10 py-5 mb-3 rounded-lg">
      <Link to={isAuth ? "/tasks" : "/"}>
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>
      <ul className="flex items-center gap-2">
        {isAuth ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <Link
                to="/add-task"
                className="px-4 py-1 bg-indigo-500 rounded-sm"
              >
                Add Task
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={async () => logout()}
                className="px-4 py-1 bg-indigo-500 rounded-sm"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="px-4 py-1 bg-indigo-500 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="px-4 py-1 bg-indigo-500 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
