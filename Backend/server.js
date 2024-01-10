const express = require("express");
 require('dotenv').config();
const router = require("./routes/userroutes");
const errorhandler = require("./middleware/errorhandler");

const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require('cors');

connectDB();


const app = express();


const port = process.env.PORT || 5001;

app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
}))

app.use(cookieParser())
app.use(express.json());

app.use("/api/users",router);

app.use(errorhandler)

app.listen(port,(req,res)=>{
    console.log(`Server is running on ${port}`)
})