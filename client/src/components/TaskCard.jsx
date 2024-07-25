import { Link } from "react-router-dom";
import { useTask } from "../context/tasks/TaskContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

/* eslint-disable react/prop-types */
function TaskCard({ task }) {
  const { deleteTask } = useTask();

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={async () => await deleteTask(task._id)}
            className="hover:bg-red-600 px-4 py-2 text-white transition-colors bg-red-500 rounded-md"
          >
            Delete
          </button>
          <Link
            to={`/tasks/${task._id}`}
            className="hover:bg-blue-600 px-4 py-2 text-white transition-colors bg-blue-500 rounded-md"
          >
            Edit
          </Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  );
}

export default TaskCard;
