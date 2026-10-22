const express = require('express');
const app = express();
app.use(express.json()); // Parse JSON bodies

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
  { id: 3, task: 'Clone the repo', completed: true },
];

//POST - Create todo
app.post('/todos', (req, res) => {
  const newTodo = { id: todos.length + 1, completed:false, ...req.body }; // Auto-ID
  todos.push(newTodo);
  res.status(201).json(newTodo); // Echo back
});
// GET – Read All todos
app.get('/todos', (req, res) => {
  res.status(200).json(todos); // Send array as JSON
});

// GET – Read all active todos
app.get('/todos/active', (req, res) => {
  const active = todos.filter((t) => !t.completed);
  res.json({success: true, data:active}); // Custom Read!
});                                                                     

// GET - Read Single
app.get('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
  res.status(200).json(todo);
});


app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error!' });
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
