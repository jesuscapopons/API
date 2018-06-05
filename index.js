'use strict'
const app= require('./app')

const mongoose      = require("mongoose");
const config= require('./config')


mongoose.connect(config.db,(err,res) =>{
  if (err)
  {
     return console.log('Error al conectar a la bd:'+err)

  }else {
    console.log('Conexión a la bd realizada');
  }

})

// Start server
app.listen(config.port, function() {
  console.log('Node server running on '+config.SERVER+':'+config.port);
})
