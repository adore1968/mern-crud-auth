import { Link } from "react-router-dom";
import { useTasks } from "../context/tasks/TasksContext";

/* eslint-disable react/prop-types */
function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="flex flex-col gap-5 p-5 bg-gray-900 rounded">
      <div className="sm:text-xl flex flex-col gap-1 text-lg">
        <h4 className="sm:text-2xl text-xl font-medium">{task.title}</h4>
        <p>{task.description}</p>
        <p>
          {task.date &&
            new Date(task.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </p>
      </div>
      <div className="sm:text-xl flex items-center gap-5 text-lg">
        <button
          type="button"
          onClick={() => deleteTask(task._id)}
          className="bg-rose-700 hover:bg-rose-600 px-4 py-2 transition-colors rounded"
        >
          Delete
        </button>
        <Link
          to={`/tasks/${task._id}`}
          className="bg-emerald-700 hover:bg-emerald-600 px-4 py-2 transition-colors rounded"
        >
          Update
        </Link>
      </div>
    </div>
  );
}

export default TaskCard;
