const express = require("express");
const { connect, set } = require("mongoose");
const app = express();
const { todoRouter } = require("./routes/todoRoute");

const MONGODB_URI =
  "mongodb+srv://admin:QFE7uC8r6V0qhc2k@crud-api-express-mongod.ddgbi.mongodb.net/todos?retryWrites=true&w=majority";

const server = async () => {
  try {
    await connect(MONGODB_URI);
    set("debug", true);
    console.log("MongoDB connected");
    app.use(express.json());

    app.use("/", todoRouter);

    app.listen(3000, () => {
      console.log("server listening on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

server();
