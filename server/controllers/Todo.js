const Todo = require("../model/Todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send(err);
  }
};

const findTodoById = async (req, res) => {
  const todoId = req.params.todoId;

  try {
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    });

    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.todoID },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          completed: req.body.completed,
        },
      },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteTodo = async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.todoID });
    res.json({ message: "Todo Deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  findTodoById
};