const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});
app.listen(port, () => {
  console.log('5001 is listen!');
});
