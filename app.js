const express         = require("express");
const bodyParser      = require("body-parser");
const hbs             =require('express-handlebars')

const app             = express();
const api      = require("./routes");
//middleware
//app.use(bodyParser.urlencoded({extended:false}))

app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false,
  parameterLimit:50000
}));

app.engine('.hbs',hbs({
  defaultLayout:'default',
  extname: '.hbs'
}))

app.set('view engine','.hbs')
//indicamos que vamos a utilizar /api como directorio de trabajo de api RESTful

app.get('/app',(req,res)=>{
  res.render('imageshow');
})

app.get('/login',(req,res)=>{
  res.render('login');
})
console.log('DIR:'+__dirname)
app.use("/uploads",express.static(__dirname + '/uploads'));
app.use('/api',api)


module.exports = app
