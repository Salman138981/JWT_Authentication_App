const express = require("express");
 require('dotenv').config();
const router = require("./routes/userroutes");
const errorhandler = require("./middleware/errorhandler");

const connectDB = require("./config/db");

connectDB();


const app = express();


const port = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/users",router);

app.use(errorhandler)

app.listen(port,(req,res)=>{
    console.log(`Server is running on ${port}`)
})