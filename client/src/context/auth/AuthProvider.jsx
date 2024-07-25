/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest,
} from "../../api/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const signup = async (user) => {
    try {
      const { status, data } = await registerRequest(user);
      if (status === 201) {
        setIsAuth(true);
        setUser(data);
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const signin = async (user) => {
    try {
      const { status, data } = await loginRequest(user);
      if (status === 200) {
        setIsAuth(true);
        setUser(data);
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = async () => {
    try {
      const { status } = await logoutRequest();
      if (status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const { token } = Cookies.get();
        if (token) {
          const { status, data } = await verifyTokenRequest(token);
          if (status === 200) {
            setIsAuth(true);
            setUser(data);
          }
        } else {
          setIsAuth(false);
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        setIsAuth(false);
        setUser(null);
      }
      setIsLoading(false);
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuth, signup, signin, errors, isLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
