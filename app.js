const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middleware
app.use(cors())
app.use(express.json()); // allows us access to req.body

//ROUTES//

//create a todo
app.post('/createtodo', async (req, res) =>{
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
})

//get all todos

//get a todo

//update a todo

//delete a todo


//listen to port number
app.listen(4040, () => {
  console.log(`❗️SERVER❗️ has started on Port 8888 😉`);
})