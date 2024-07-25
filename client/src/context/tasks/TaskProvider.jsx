/* eslint-disable react/prop-types */
import { useState } from "react";
import { TaskContext } from "./TaskContext";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../../api/tasks";
import { useNavigate } from "react-router-dom";

function TaskProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const { status, data } = await getTasksRequest();
      if (status === 200) {
        setTasks(data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
      if (status === 201) {
        console.log(data);
        navigate("/tasks");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      const { status, data } = await updateTaskRequest(id, task);
      if (status === 200) {
        console.log(data);
        navigate("/tasks");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const { status } = await deleteTaskRequest(id);
      if (status === 204) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        isLoading,
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
