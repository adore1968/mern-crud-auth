import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { isAuth, loginUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      return navigate("/tasks");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const onSubmit = handleSubmit((data) => {
    loginUser(data);
    reset();
  });

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-84px)]">
      <div className="flex flex-col flex-auto max-w-md gap-5 p-5 bg-gray-900 rounded">
        <h1 className="sm:text-3xl text-2xl font-semibold">Login</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="sm:text-2xl text-xl font-medium">
              The email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="bg-gray-950 sm:text-xl px-4 py-2 text-lg text-gray-200 rounded"
              {...register("email", {
                required: {
                  value: true,
                  message: "The email is required",
                },
              })}
            />
            {errors.email && (
              <p className="sm:text-xl mt-1 text-lg text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="sm:text-2xl text-xl font-medium"
            >
              The password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="bg-gray-950 sm:text-xl px-4 py-2 text-lg text-gray-200 rounded"
              {...register("password", {
                required: {
                  value: true,
                  message: "The password is required",
                },
              })}
            />
            {errors.password && (
              <p className="sm:text-xl mt-1 text-lg text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="hover:bg-emerald-600 sm:text-xl bg-emerald-700 px-4 py-2 text-lg font-medium transition-colors rounded"
          >
            Login
          </button>
        </form>
        <div className="sm:text-xl flex items-center justify-between text-lg">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="text-gray-200">Don't have an account?</p>
          <Link
            to="/login"
            className="hover:text-emerald-600 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
