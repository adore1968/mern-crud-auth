import { useEffect } from "react";
import { useTask } from "../context/tasks/TaskContext";
import TaskCard from "../components/TaskCard";
import NoTasks from "../components/NoTasks";
import Loader from "../components/Loader";

function TasksPage() {
  const { getTasks, isLoading, tasks } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (tasks.length === 0) {
    return <NoTasks />;
  }

  return (
    <div className="sm:grid-cols-2 md:grid-cols-3 grid grid-cols-1 gap-2">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TasksPage;
