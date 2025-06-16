import { Todo } from "../models/todoModel.js";

export async function createTodo(req, res) {
  try {
    const { title, description, done, priority } = req.body;
    if (!title) {
      return res.status(400).send({
        message: "Title is required",
        success: false,
      });
    }
    const todo = new Todo({
      title,
      description,
      done,
      priority,
      user: req._id,
    });
    await todo.save();
    res.status(200).send({
      message: "Todo created successfully",
      success: true,
      todo,
    });
  } catch (error) {
    console.log("Error in createTodo API", error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
}

export async function getTodos(req, res) {
  try {
    const _id = req._id;
    const todos = await Todo.find({ user: _id }).sort({
      priority: 1,
      createdAt: 1,
    });
    return res.status(200).send({
      message: "List of all your todos",
      success: true,
      todos,
    });
  } catch (error) {
    console.log("Error in getTodos API", error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
}

export async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const { title, description, priority, done } = req.body;
    if (!title && !description && !priority && !done) {
      return res.status(400).send({
        message: "Please provide at lease 1 field to update",
        success: false,
      });
    }
    const updatedList = {};
    if (title) updatedList.title = title;
    if (description) updatedList.description = description;
    if (priority) updatedList.priority = priority;
    if (done !== undefined || done !== null) updatedList.done = done;
    const updatedTodo = await Todo.findByIdAndUpdate(id, updatedList);
    res.status(200).send({
      message: "Todo updated successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in update Todo API", error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
}

export async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).send({
      message: "Todo deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in delete Todo API", error);
    return res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
}
