
 const express=require("express");

const adminrouter=express.Router();

let mongoose = require("mongoose");
require("./../models/eventmodel");

eventmodel = mongoose.model("event");
speakermodel = mongoose.model("speaker");



adminrouter.get("/profile",function(request,response,next){

     eventmodel.find().populate({ path: "mainspeaker otherspeaker" })
    
    .then((data) => { response.render("authentication/home.ejs",{events:data}); })
    .catch((err) => { console.groupCollapsed(err + "") });


                   

})//get admin /profiel


module.exports=adminrouter;