const express = require('express');
const cors = require('cors');
const pool = require('./db.js')
const app = express();
const port = 5001;
app.use(cors());
app.use(express.json());

app.get('/todos', async (req, res) => {
 try {
  const allTodos = await pool.query("SELECT * FROM todo ")
  res.json(allTodos.rows)
 } catch (error) {
  console.error(error.message)
 }
});

app.listen(port, () => {
  console.log('5001 is listen!');
});
