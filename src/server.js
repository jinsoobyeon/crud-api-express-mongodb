const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { Todo } = require("./models/Todo");

const MONGODB_URI =
  "mongodb+srv://admin:QFE7uC8r6V0qhc2k@crud-api-express-mongod.ddgbi.mongodb.net/todos?retryWrites=true&w=majority";

const todos = [];

const server = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    app.use(express.json());

    app.get("/", async (_, response) => {
      try {
        const todos = await Todo.find({});
        return response.send({ todos });
      } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
      }
    });

    app.get("/:id", async (request, response) => {
      try {
        const { id } = request.params;
        if (!mongoose.isValidObjectId(id)) {
          return response.status(400).send({ error: "invalid id" });
        }

        const todo = await Todo.findOne({ _id: id });
        return response.send({ todo });
      } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
      }
    });

    app.post("/", async (request, response) => {
      try {
        const { todoItem } = request.body;
        if (!todoItem) {
          return response.status(400).send({ error: "todoItem is required" });
        }

        const todo = new Todo(request.body);
        await todo.save();
        return response.send({ todo });
      } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
      }
    });

    app.put("/:id", async (request, response) => {
      try {
        const { id } = request.params;
        if (!mongoose.isValidObjectId(id)) {
          return response.status(400).send({ error: "invalid id" });
        }

        const { todoItem } = request.body;
        const todo = await Todo.findByIdAndUpdate(
          id,
          { $set: { todoItem } },
          { new: true }
        );
        return response.send({ todo });
      } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
      }
    });

    app.delete("/:id", async (request, response) => {
      try {
        const { id } = request.params;
        if (!mongoose.isValidObjectId(id)) {
          return response.status(400).send({ error: "invalid id" });
        }

        const todo = await Todo.findOneAndDelete({ _id: id });
        return response.send({ todo });
      } catch (error) {
        console.log(error);
        return response.status(500).send({ error: error.message });
      }
    });

    app.listen(3000, () => {
      console.log("server listening on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

server();
