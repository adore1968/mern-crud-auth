import { useForm } from "react-hook-form";
import { useTask } from "../context/tasks/TaskContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTask();
  const { id } = useParams();

  useEffect(() => {
    const loadTask = async () => {
      const { title, description, date } = await getTask(id);
      setValue("title", title);
      setValue("description", description);
      setValue("date", dayjs.utc(date).utc().format("YYYY-MM-DD"));
    };

    if (id) {
      loadTask();
    }
  }, [id]);

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };
    if (id) {
      await updateTask(id, dataValid);
    } else {
      await createTask(dataValid);
    }
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 w-full max-w-md p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            {...register("title")}
            className="bg-zinc-700 w-full px-4 py-2 my-2 text-white rounded-md"
            autoFocus
          />

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            rows="3"
            {...register("description")}
            className="bg-zinc-700 w-full px-4 py-2 my-2 text-white rounded-md"
          ></textarea>

          <label htmlFor="title">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            {...register("date")}
            className="bg-zinc-700 w-full px-4 py-2 my-2 text-white rounded-md"
          />
          <button type="submit" className="px-3 py-2 bg-indigo-500 rounded-md">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
