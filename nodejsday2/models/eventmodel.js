let mongoose=require("mongoose");
let autoIncrement = require('mongoose-auto-increment');





let  eventscheme=new mongoose.Schema({


title:{type:String,required:true}, 
date:String,
mainspeaker:{type:Number,ref:"speaker"},
otherspeaker:[{type:Number,ref:"speaker"}],



}); //define scheme for events 

var connection = mongoose.createConnection("mongodb://localhost:27017/nodedb");
autoIncrement.initialize(connection);
eventscheme.plugin(autoIncrement.plugin, {model:'event',startAt:1000, incrementBy:1});

m=mongoose.model("event",eventscheme)
