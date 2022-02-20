const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(cors())
app.use(express.json()); // allows us access to req.body

//listen to port number
app.listen(8888, () => {
  console.log(`❗️SERVER❗️ has started on Port 8888 😉`);
})