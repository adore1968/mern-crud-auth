import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.controllers.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/", authRequired, getTasks);

router.get("/:id", authRequired, getTask);

router.post("/", authRequired, validateSchema(createTaskSchema), createTask);

router.put("/:id", authRequired, updateTask);

router.delete("/:id", authRequired, deleteTask);

export default router;
