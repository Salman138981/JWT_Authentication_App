const asyncHandler = require('express-async-handler');

const bcrypt = require('bcrypt');

const User = require('../model/userModel');

const jwt = require("jsonwebtoken")

const createUser = asyncHandler(  async(req,res)=>{

    const{name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const availableUser =await User.findOne({email});
    if(availableUser){
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password: ", hashedPassword);

    const user =await User.create({
        name,
        email,
        password: hashedPassword
    }); 

    if(user){
        res.status(201).json({_id:user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid!");
    }
})

const loginUser = asyncHandler(async(req,res)=>{

    const {email, password} = req.body;
        console.log(req.body);
    if(!email || !password){
        res.status(400);
        throw new Errror("All fields are mandatory!")
    }

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                name : user.name,
                email : user.email,
                id : user.id
            }
        },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '5m'
          }
        )
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or Password is not valid!");
    }
})

const currentUser = asyncHandler( async(req,res)=>{
    res.json(req.user);
})



module.exports = {createUser, loginUser, currentUser};
