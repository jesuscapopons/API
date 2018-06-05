'use strict'

//importaciones
const servicio = require("../helpers");




function hasPermission(req,res,next)
{
  if(!req.headers.authorization)
  {
    return res.status(403).send({message:'PERMISSION_DENIED'})
  }

  const token= req.headers.authorization.split(' ')[1]

servicio.info()

var promiseService=servicio.decodeToken(token)

promiseService.then(response =>{
  req.user = response
  //passamos a la siguiente llamada del callback
  next()
})

promiseService.catch(response =>{
  res.status(response.status)
})

}

module.exports=hasPermission
