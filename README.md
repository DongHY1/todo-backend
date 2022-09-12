+ pnpm install
+ create your own db.js like 
```
const Pool = require('pg').Pool
const pool = new Pool({
  user:"xxxx",
  password:"xxxxx",
  host:"localhost",
  port:5432,
  database:"xxxx"
})
module.exports = pool;
```
+ pnpm run dev

Enjoy!