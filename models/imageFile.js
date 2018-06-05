'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageFileSchema = new Schema({
		name: 		{ type: String },
		modified: 	{ type: Boolean },
		order: 	{ type: Number },
		description: 	{ type: String },
    owner: 	{ type: String },
    activityId:  	{ type: Number },
    correctionName:  	{ type: Number },
		path:  	{ type: String },
	})

	module.exports=mongoose.model('ImageFile', imageFileSchema);
