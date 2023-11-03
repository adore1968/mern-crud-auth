import { useForm } from "react-hook-form";
import { useTasks } from "../context/tasks/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
dayjs.extend(utc);

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const { createTask, getTask, updateTask } = useTasks();

  const { id } = useParams();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    if (!id) {
      createTask({
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    } else {
      updateTask(id, {
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    }
    reset();
    navigate("/tasks");
  });

  useEffect(() => {
    if (id) {
      getTask(id)
        .then((task) => {
          setValue("title", task.title);
          setValue("description", task.description);
          setValue(
            "date",
            task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
          );
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-84px)]">
      <div className="flex flex-col flex-auto max-w-md gap-5 p-5 bg-gray-900 rounded">
        <h1 className="sm:text-3xl text-2xl font-semibold">
          {id ? "Update Task" : "Create Task"}
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="sm:text-2xl text-xl font-medium">
              The title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              className="bg-gray-950 sm:text-xl px-4 py-2 text-lg text-gray-200 rounded"
              {...register("title", {
                required: {
                  value: true,
                  message: "The title is required",
                },
              })}
            />
            {errors.title && (
              <p className="sm:text-xl mt-1 text-lg text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="sm:text-2xl text-xl font-medium"
            >
              The description
            </label>
            <textarea
              rows="3"
              id="description"
              placeholder="Description"
              className="bg-gray-950 sm:text-xl px-4 py-2 text-lg text-gray-200 rounded resize-none"
              {...register("description", {
                required: {
                  value: true,
                  message: "The description is required",
                },
              })}
            ></textarea>
            {errors.description && (
              <p className="sm:text-xl mt-1 text-lg text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="sm:text-2xl text-xl font-medium">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="bg-gray-950 sm:text-xl px-4 py-2 text-lg text-gray-200 rounded resize-none"
              {...register("date", {
                required: {
                  value: true,
                  message: "The date is required",
                },
              })}
            />
            {errors.date && (
              <p className="sm:text-xl mt-1 text-lg text-red-600">
                {errors.date.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`sm:text-xl px-4 py-2 text-lg font-medium transition-colors rounded ${
              id
                ? "bg-emerald-700 hover:bg-emerald-600"
                : "bg-rose-700 hover:bg-rose-600"
            }`}
          >
            {id ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default TaskFormPage;
