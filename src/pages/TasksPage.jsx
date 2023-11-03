import { useEffect } from "react";
import { useTasks } from "../context/tasks/TasksContext";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";

function TasksPage() {
  const { getTasks, tasks, isLoading } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (tasks.length < 1) {
    return (
      <section className="mt-10">
        <div className="text-center">
          <h1 className="sm:text-3xl text-2xl font-bold">No tasks</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <div className="lg:grid-cols-3 sm:grid-cols-2 grid grid-cols-1 gap-5">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </section>
  );
}

export default TasksPage;
