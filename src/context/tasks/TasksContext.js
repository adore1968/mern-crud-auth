import { createContext, useContext } from "react";

export const TasksContext = createContext();

export const useTasks = () => {
  const tasksContext = useContext(TasksContext);
  if (!tasksContext) {
    throw new Error("useTasks must be used within <TasksContext.Provider>");
  }
  return tasksContext;
};
