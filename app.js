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
    const {description} = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING * ", [description])
    res.json(newTodo.rows[0]);
    console.log(`"${description}" inserted into todo table`);
  } catch (err) {
    console.error(err.message);
  }
})

//get all todos
app.get('/alltodos', async (req,res) => {
  try {
    const alltodos = await pool.query("SELECT * FROM todo");
    res.json(alltodos.rows);
  } catch (err) {
    console.error(err);
  }
})

//get a todo

//update a todo

//delete a todo


//listen to port number
app.listen(4040, () => {
  console.log(`❗️SERVER❗️ has started on Port 8888 😉`);
})