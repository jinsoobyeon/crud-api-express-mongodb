const express = require("express");
const app = express();

const todos = [];

app.use(express.json());

app.get("/", (_, response) => {
  return response.send(todos);
});

app.post("/", (request, response) => {
  todos.push(request.body.todo);
  return response.send({ success: true });
});

app.put("/todo/:todo", (request, response) => {
  todos.splice(
    todos.findIndex((todo) => todo === request.params.todo),
    1,
    request.body.todo
  );
  return response.send({ success: true });
});

app.delete("/todo/:todo", (request, response) => {
  todos.splice(
    todos.findIndex((todo) => todo === request.params.todo),
    1
  );
  return response.send({ success: true });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
