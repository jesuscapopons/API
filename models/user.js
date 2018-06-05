'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')


const UserSchema = new Schema({
  userId: {
      type: String
    /*  unique:true,*/
    /*  required: true*/
  },
  email: {
      type: String
    /*  unique:true,*/
    //  required: true
  },
  password:{type: String /*select:false*/},
/*  signupDate:{type:Date,default:Date.now() },
  lastLogin:{type:Date },*/
    name:
    {
        type: String
      //  required: true
    },
    surname:
    {
        type: String
      //  required: true
    }
});

//antes de guardar hay que realizar un hash del password
UserSchema.pre('save',function (next){

  let user = this

  //if(!user.isModified('password'))return next()

  bcrypt.genSalt(10, (err,salt)=> {
    if(err) return next(err)

    bcrypt.has(user.password,salt,null,(err,hash)=>{
      if(err) return next(err)
      //sustituir el texto del usuario por su hash correspondiente
      user.password=hash
      next()
    })
  })

})


module.exports = mongoose.model("user", UserSchema);
