import { useState } from "react";
import { TasksContext } from "./TasksContext";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../../api/tasks";

// eslint-disable-next-line react/prop-types
function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTasks = async () => {
    try {
      const { status, data } = await getTasksRequest();
      if (status === 200) {
        setTasks(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getTask = async (id) => {
    try {
      const { status, data } = await getTaskRequest(id);
      if (status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      const { status, data } = await createTaskRequest(task);
      if (status === 200) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      console.log(task);
      const { status, data } = await updateTaskRequest(id, task);
      if (status === 200) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const { status } = await deleteTaskRequest(id);
      if (status === 200) {
        const newTasks = tasks.filter((task) => task._id !== id);
        setTasks(newTasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        getTasks,
        getTask,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;
