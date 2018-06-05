'use strict'

const ImageFile =require('../models/imageFile')
const fs = require('fs');
const config = require('../config');

function getImage(req,res)
{
      console.log('getImage')
  let imageId= req.params.imageId
  console.log(req.params.imageId)
  ImageFile.findById(imageId, (err, image)=>{
    if(err) return res.status(500).send({message:'Error en la consulta:'+err})
    if(!image) return res.status(404).send({message:'Imagen no existe:'+err})
    res.status(200).send({image})
  })
}

function getImages(req,res)
{
    console.log('getImages')
  ImageFile.find({},(err,images)=>{
      if(err) return res.status(500).send({message:'Error en la consulta:'+err})
      if(!images) return res.status(404).send({message:'No hay imagenes:'+err})
      res.status(200).send({images})
    })
}

//[DELETE]http://localhost:3001/api/delete/5ad66cd2273ac34aa8b9f9f3

function deleteImage(req,res)
{
  let imageId= req.params.imageId

  console.log('Deleting: '+req.params.imageId)
  ImageFile.findById(imageId, (err, image)=>
  {
    if(err) return res.status(500).send({message:'Error en la consulta:'+err})
    if(!image) return res.status(404).send({message:'Imagen no existe:'+err})
try{
      fs.chmodSync(config.UPLOAD_DIR+image.name, '0777',function(error) {
        if (error)
        {
          console.log(error);

        }
        console.log('chmod '+image.name);
      });

      fs.unlinkSync(config.UPLOAD_DIR+image.name, function(error) {
        if (error)
        {
          console.log(error);

        }
        console.log('Deleted '+image.name);
      });

      image.remove(err =>{
        if(err)res.status(500).send({message: 'DELETE_ERROR: '+imageId})
        return res.status(200).send({message: 'DELETED: '+imageId})
      })


  }catch(err)
  {
    image.remove(err =>{
      return res.status(500).send({message: 'IMAGE_NOT_FOUND: '+imageId})
    })
  }

  })
}


function saveImage(req,res)
{
  console.log(req.body)
  console.log(req.body.name)
  console.log(req.body.description)
  let image = new ImageFile()
  image.name=req.body.name
  image.description=req.body.description
  if(req.body.name)
  {
  image.save((err,imageStored) =>{
    if(err) res.status(500).send({message: 'Error al guardar:'+err})
    res.status(200).send({productStored:true})
  })
  }
}

function updateImage(req,res)
{
  let imageId= req.params.imageId
  console.log(req.params.imageId)
  let update= req.body
  ImageFile.findByIdAndUpdate(imageId, update, (err, imageUpdated)=>
  {
    if(err) return res.status(500).send({message:'Error al modificar:'+ imageId + err})
      return res.status(200).send({message: 'Modificado: '+imageId})
  })
}

module.exports={getImage,getImages,saveImage,deleteImage,updateImage}
