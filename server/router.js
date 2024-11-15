const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  findTodoById
} = require("./controllers/Todo");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.put("/todos/:todoID", updateTodo);
router.delete("/todos/:todoID", deleteTodo);
router.get('/todos/:todoId', findTodoById);

module.exports = router;
