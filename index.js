const express = require('express');
const cors = require('cors');
const pool = require('./db.js');
const app = express();
const port = 5001;
app.use(cors());
app.use(express.json());

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo ');
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );
    res.json(newTodo.rows[0])
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`${port} is listen`);
});
