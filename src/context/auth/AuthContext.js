import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within <AuthContext.Provider>");
  }
  return authContext;
};
