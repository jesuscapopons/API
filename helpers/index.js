'use strict'
//importar
const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')



function createToken(user){
  const payload ={
    sub: user.userID,
    iat:moment().unix(),
    exp:moment().add(60,'days').unix()
  }
  return jwt.encode(payload,config.SECRET_TOKEN)
}

function info()
{
    console.log('helper info')
    return true
}
// decodifica de acuerdo a jwt.io
function decodeToken(token)
{

  var  decoded = new Promise((resolve,reject)=>{
    try{
      const payload = jwt.decode(token,config.SECRET_TOKEN)

      if(payload.exp <=moment().unix())
      {
        reject({status: 401,message:'TOKEN_EXPIRED'})
      }

      resolve(payload.sub)

    }catch(err){
      reject({status:500,message:'INVALID_TOKEN'})

    }


  })
  return decoded
}
//exportar como un objeto
module.exports = {createToken,decodeToken,info}
