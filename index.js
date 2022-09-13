const express = require('express');
const cors = require('cors');
const pool = require('./db.js');
const app = express();
const port = 5001;
app.use(cors());
app.use(express.json());
// 查
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo ');
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});
// 增
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
// 查一个
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getTodo = await pool.query('SELECT * FROM todo WHERE id=$1', [id]);
    res.json(getTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
// 改一个
app.put('/todos/:id',async (req,res)=>{
  try {
    const { id } = req.params;
    const {description} = req.body
    const putTodo = await pool.query('UPDATE todo SET description = $1 WHERE id = $2 RETURNING *', [description,id]);
    res.json(putTodo.rows[0]);
  } catch (error) {
    console.error(error.message)
  }
})
// 删除一个
app.delete('/todos/:id',async (req,res)=>{
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE id = $1', [id]);
    res.json('Nice Delete!');
  } catch (error) {
    console.error(error.message)
  }
})
app.listen(port, () => {
  console.log(`${port} is listen`);
});
