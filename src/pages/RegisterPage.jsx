import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { isAuth, registerUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      return navigate("/tasks");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const onSubmit = handleSubmit((data) => {
    registerUser(data);
    reset();
  });

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-84px)]">
      <div className="flex flex-col flex-auto max-w-md gap-5 p-5 bg-gray-900 rounded">
        <h1 className="sm:text-3xl text-2xl font-semibold">Register</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="sm:text-2xl text-xl font-medium"
            >
              The username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="bg-gray-950 sm:text-xl px-4 py-2 text-lg text-gray-200 rounded"
              {...register("username", {
                required: {
                  value: true,
                  message: "The username is required",
                },
              })}
            />
            {errors.username && (
              <p className="sm:text-xl mt-1 text-lg text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
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
            className="hover:bg-rose-600 sm:text-xl bg-rose-700 px-4 py-2 text-lg font-medium transition-colors rounded"
          >
            Register
          </button>
        </form>
        <div className="sm:text-xl flex items-center justify-between text-lg">
          <p className="text-gray-200">Already have an account?</p>
          <Link to="/login" className="hover:text-rose-600 transition-colors">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
