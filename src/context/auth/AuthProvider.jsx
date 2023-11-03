import { AuthContext } from "./AuthContext";
import {
  loginUserRequest,
  registerUserRequest,
  verifyTokenRequest,
} from "../../api/auth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const registerUser = async (user) => {
    try {
      const { status, data } = await registerUserRequest(user);
      if (status === 200) {
        setUser(data);
        return setIsAuth(true);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuth(false);
    }
  };

  const loginUser = async (user) => {
    try {
      const { status, data } = await loginUserRequest(user);
      if (status === 200) {
        setUser(data);
        return setIsAuth(true);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuth(false);
    }
  };

  const logoutUser = async () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuth(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuth(false);
        setIsLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest();
        console.log(res);
        if (!res.data) {
          setUser(null);
          setIsAuth(false);
          return setIsLoading(false);
        }
        setUser(res.data);
        setIsAuth(true);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setUser(null);
        setIsAuth(false);
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuth, isLoading, registerUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
