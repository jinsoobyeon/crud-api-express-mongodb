const { Router } = require("express");
const { isValidObjectId } = require("mongoose");
const { Todo } = require("../models/Todo");

const todoRouter = Router();

todoRouter.get("/", async (_, response) => {
  try {
    const todos = await Todo.find({});
    return response.send({ todos });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error: error.message });
  }
});

todoRouter.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    if (!isValidObjectId(id)) {
      return response.status(400).send({ error: "invalid id" });
    }

    const todo = await Todo.findById(id);
    return response.send({ todo });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error: error.message });
  }
});

todoRouter.post("/", async (request, response) => {
  try {
    const { todoItem } = request.body;
    if (!todoItem) {
      return response.status(400).send({ error: "todoItem is required" });
    }

    if (typeof todoItem !== "string") {
      return response.status(400).send({ error: "todoItem must be a string" });
    }

    const todo = new Todo(request.body);
    await todo.save();
    return response.send({ todo });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error: error.message });
  }
});

todoRouter.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    if (!isValidObjectId(id)) {
      return response.status(400).send({ error: "invalid id" });
    }

    const { todoItem } = request.body;
    if (typeof todoItem !== "string") {
      return response.status(400).send({ error: "todoItem must be a string" });
    }

    const todo = await Todo.findById(id);
    if (todoItem) {
      todo.todoItem = todoItem;
    }
    await todo.save();
    return response.send({ todo });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error: error.message });
  }
});

todoRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    if (!isValidObjectId(id)) {
      return response.status(400).send({ error: "invalid id" });
    }

    const todo = await Todo.findByIdAndDelete(id);
    return response.send({ todo });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ error: error.message });
  }
});

module.exports = {
  todoRouter,
};
