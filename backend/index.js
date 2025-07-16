require("dotenv").config({})
const express = require('express');
const DB = require("./src/db/db.config")
const cors = require('cors');
const bodyParser = require('body-parser');

DB()

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/api',require("./src/routes/index"))

app.use("/", (req, res) => {
    res.status(404).send({message: "Not Foundddddddddddd"});
})


app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})