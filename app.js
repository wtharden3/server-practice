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
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING * ", [description]) //this has to be in array
    res.json(newTodo.rows[0]);
    console.log(`"${description}" was inserted into todo table`);
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
    console.error(err.message);
  }
})

//get a todo
app.get('/todo/:id', async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);
    const atodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id] ) //this as to be in array
    res.send(atodo.rows[0])
    console.log(`here is the todo ${atodo.rows[0].description}`);
  } catch (err) {
    console.error(`[ERROR] ${err.message}`);
  }
})

//update a todo
app.put('/todo/:id', async (req, res) => {
  try {
   const {id} = req.params;
   const {description} = req.body;
   const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
   res.json(`updated!`)
  } catch (err) {
    console.error(`[ERROR] ${err.message}`);
  }
})

//delete a todo
app.delete('/todo/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
    res.json(`the record is deleted!`);
  } catch (err) {
    console.error(`[ERROR] ${err.message}`);
  }
})


//listen to port number
app.listen(4040, () => {
  console.log(`❗️SERVER❗️ has started on Port 4040 😉!`);
})