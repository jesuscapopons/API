'use strict'
 const express = require('express')
 const ImageControl =require('../controlers/imageControl');
 const api = express.Router()
 const access=require('../middlewares/access')
 const UserControl =require('../controlers/userControl');
 const config = require('../config')

 const ImageFile =require('../models/imageFile')
 const mongoose = require('mongoose')

 //upload de imagenes
 const multer = require('multer');


 const storage = multer.diskStorage({
   destination: function (req, file, cb) {

   cb(null, config.UPLOAD_DIR)

 },
   filename: function(req, file, cb) {
     console.log('disk storage configuración2');
     var newName=Math.floor(Math.random() * 100000001)+Math.floor(Math.random() * 100000001) + '_flipflop.jpg';

     imagenToUpload.name=newName;
     cb(null, newName);
   }
 });

 const fileFilter = (req, file, cb) => {
   // reject a file
   if (file.mimetype === 'image/jpeg' ) {
     //se guarda ya que el callback devuelve true
     console.log('TYPE_OK');
	 cb(null, true);
   } else {
     //El callback devuelve false y no se guarda
	 console.log('TYPE_NOT_EXPECTED');
     cb(null, false);
   }
 };

 const upload = multer({
 storage: storage,

  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const imagenToUpload = new ImageFile({
  //_id: new mongoose.Types.ObjectId()

});


api.post("/upload", upload.single('pictureImage'), (req, res, next) => {
console.log('upload');

  let imageToSave = new ImageFile()
 
  imageToSave.name=imagenToUpload.name
  imageToSave.order=req.body.order
  

  imageToSave.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "IMAGE_UPLOAD_OK",
        uploadedImage: {
            name: result.name,
            order: result.order,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://ew-box.com/uploads/" + result.name
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
});
});


//fin upload de imagenes

 //http://localhost:3001/api/images/
 api.get('/images',ImageControl.getImages)


 //http://localhost:3001/api/image/5acf52547bff423160b640af
 api.post('/image',ImageControl.saveImage)

 //modificar
 api.put('/image/:imageId',ImageControl.updateImage)

 api.delete('/delete/:imageId',ImageControl.deleteImage)

api.get('/info',access,(req,res)=>
{
  res.status(200).send({message:'Server running and autenticated user'})
})

api.post('/login',UserControl.logIn)
api.post('/signup',UserControl.signUp)

module.exports=api
