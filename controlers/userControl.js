'use strict'
const mongoose = require("mongoose");
const User = require("../models/user");
const Helper = require("../helpers");
const UserControl = require("./userControl");


function signUp(req,res){
    console.log('signUp')
      console.log(req.body)

  const user= new User({
    email: req.body.email,
    name:req.body.name,
    password:req.body.password,
    surname:req.body.surname,
    userId:req.body.userId
  })

  if(req.body.email)
  {
    user.save((err,userStored) =>{
    if(err) return res.status(500).send({message: 'USER_SAVE_ERROR',error:err})
    return res.status(200).send({userStored:true,token:Helper.createToken(user)})
    })
  }

}


function logIn(req,res)
{
  console.log('LogIn')

 User.find({email:req.body.email},(err,user)=>
{
  if(err) return res.status(500).send({message:'LOGIN_ERROR', error:err})
  if(!user) return res.status(404).send({message:'USER_NOT_FOUND'})
   req.user=user
   res.status(200).send({message:'LOGGED_IN',token:Helper.createToken(user)})
})
}

module.exports={
  signUp,
  logIn
}
