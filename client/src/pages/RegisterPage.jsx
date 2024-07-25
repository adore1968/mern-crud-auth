/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuth, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/tasks");
    }
  }, [isAuth]);

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <h1 className="my-2 text-3xl font-bold">Register</h1>
        {registerErrors.map((error, index) => (
          <div
            key={index}
            className="p-2 my-2 text-center text-white bg-red-500"
          >
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            {...register("username", { required: "Username is required" })}
            className="bg-zinc-700 w-full px-4 py-2 rounded-md"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <input
            type="email"
            name="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="bg-zinc-700 w-full px-4 py-2 my-2 rounded-md"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            type="password"
            name="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className="bg-zinc-700 w-full px-4 py-2 mb-2 rounded-md"
            placeholder="******"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <div className="flex items-center justify-between gap-2">
            <p>Already have an account?</p>
            <Link to="/login" className="text-sky-500">
              Login
            </Link>
          </div>
          <button
            type="submit"
            className="bg-sky-500 px-4 py-2 my-2 text-white rounded-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
