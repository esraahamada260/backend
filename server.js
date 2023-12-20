const express = require('express'); //هو متغير اسمه اكسبرس فيه المديول اللي اسمه اكسبرس
const mongoose = require('mongoose');


let app = express();

//connect server to mongo server --> lacal database
mongoose.connect("mongodb://localhost:27017/users",(err)=>{
    if (!err) console.log('DataBase now is connected..');
    else console.log('You have error')
})

//SHEMA
const userschema = new mongoose.Schema({
      username : String,
      email : String,
      phone : String,
      password: String,
      confirmpassword : String,
});
//convert schema to model(class)
let usermodel = new mongoose.model("users",userschema);


const goodschema = new mongoose.Schema({
    price : Number,
    id : Number,
});
let goodmodel = new mongoose.model("goods",goodschema);
 let user = new usermodel({
    username :"Amira",
    email : "amira@gmail.com",
    phone:"01023646365",
    password:"123456",
    confirmpassword:"123456",
 }).save();

 //endpoint (api) fetch all users from data base

 app.get('/users',async(req , res)=>{
    let allusers = await usermodel.find();
    res.status(200);
    console.log(allusers.length)
    res.json(allusers)
 })
app.get('/',(req , res)=>{
    res.send('.WELCOM.')
})
app.post('/users' , async(req,res)=>{
    let newusers = await usermodel({
        username:'ali',
        password:'12378',
    }).save();
    res.status(201);
    res.json("users has been added")
})




app.listen(3000 , function(){
    console.log('Server now is open.')
})