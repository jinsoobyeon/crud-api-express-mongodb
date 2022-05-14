const { Schema, model } = require("mongoose");

const TodoSchema = new Schema(
  {
    todoItem: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Todo = model("todo", TodoSchema);
module.exports = { Todo };
