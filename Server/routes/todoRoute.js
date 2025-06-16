import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = Router();

router.post("/createTodo", createTodo);
router.get("/getTodos", getTodos);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

export default router;
