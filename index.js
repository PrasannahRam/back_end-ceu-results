const express = require('express');       // import express
const app = express();                    // create an Express app
const mysql = require("mysql2");
const cors = require('cors'); // add this
require("dotenv").config();

app.use(cors());    
app.use(express.json());                  // enable parsing JSON body in requests
console.log(process.env.MYSQL_URL);

const db = mysql.createConnection(process.env.MYSQL_URL);


// Define a basic route
app.get('/', (req, res) => {
  res.send(`Hello from Node server!`);
});

app.post('/api/result',(req,res)=>{
  const idtype = req.body.idtype
  const exam = req.body.exam
  const id = req.body.id
  const year = req.body.year
    console.log(req.body);
    try {
      db.query(
    `SELECT * FROM ${exam}_${year} WHERE ${idtype} = ?`,
    // `SELECT * FROM ${exam} WHERE ${idtype} = ?`,
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0) return res.status(404).json({ message: "No result found" });
      res.json(result[0]);
      console.log(res.json());
      
    }
  )
    } catch (error) {
      console.log(error);
      
    }
    
})

const PORT = process.env.PORT || 3000;                        // define a port

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
