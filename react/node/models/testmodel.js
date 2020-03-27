const express=require("express");
const testrouter=express.Router();

let mongoose=require("mongoose");
let autoIncrement = require('mongoose-auto-increment');
 
//  dbconn=dbconn.conectiondb;


console.log("hghghghghghghghghg");

let  eventscheme=new mongoose.Schema({


title:String, 
date:String,
mainspeaker:{type:Number,ref:"speaker"},
otherspeaker:[{type:Number,ref:"speaker"}],



}); //define scheme for events 
 var connection = mongoose.createConnection("mongodb://localhost:27017/nodedb");
autoIncrement.initialize(connection);
eventscheme.plugin(autoIncrement.plugin, 'test');
c=mongoose.model("test",eventscheme);


