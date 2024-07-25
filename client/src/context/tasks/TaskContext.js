import { createContext, useContext } from "react";

export const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask should be used inside TaskProvider");
  }
  return context;
};
