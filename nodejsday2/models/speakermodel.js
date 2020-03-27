let mongoose=require("mongoose");
let autoIncrement = require('mongoose-auto-increment');


var Crypter =require("cryptr");
crypter=new Crypter("devnami")
var encstring=crypter.encrypt("234234");
var desc=crypter.decrypt(encstring)
console.log(encstring,"    ",desc)

console.log(-09865439098)


speakerschema=new mongoose.Schema(
    {
        _id:Number,
        fullname:String,
        username:String,
        age:{type:Number,min:15,max:80},
        
       
        password:String,
         address:{
             city:String,
             street:String,
             building:String

         }
    });//models and put schema

//mapping now 23raf men hyshta8l 3la eh we ex lma bklm sql b7wlhom le opjects
var connection = mongoose.createConnection("mongodb://localhost:27017/nodedb");
autoIncrement.initialize(connection);
speakerschema.plugin(autoIncrement.plugin, 'speaker');

mongoose.model("speaker",speakerschema);

