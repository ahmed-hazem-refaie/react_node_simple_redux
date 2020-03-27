let express = require("express");

let path =require("path");

let authorrouter =require("./router/authrouter.js");
let adminrouter=require("./router/adminrouter.js");
let speakerrouter =require("./router/speakerrouter.js");
let eventrouter=require("./router/eventrouter.js");
let mongoose=require("mongoose");
let session=require("express-session");
let morgan=require("morgan");
let bodyParser = require('body-parser')
cors=require("cors");


autoIncrement = require('mongoose-auto-increment');
var flash=require('connect-flash');
// server.use(test);



//get server refrense 
const server=express();
//////////////////////////////////////////////////////
//open server 

server.listen(8090,()=>{console.log("im ready now00 node :::")

 let conectiondb=mongoose.connect("mongodb://localhost:27017/nodedb")
.then(()=>{console.log("conected to DB")

autoIncrement.initialize(this);
})
.catch((err)=>{err+""})  

});

//to add body property in link
// server.use(express.urlencoded());
server.use(flash());
server.use(cors());
server.use(morgan("dev"));

// server.use(session({secret:"zoma"}))
server.use(bodyParser())
server.set("view engine","ejs");
server.set("views",path.join(__dirname,"/views"))

server.use(express.static(path.join(__dirname,"public")));
server.use(express.static(path.join(__dirname,"node_modules")));


server.use(function(req,res,nxt){console.log(req.method,"==",req.url,"===");nxt()})



server.use(authorrouter);
server.use("/speaker",speakerrouter);

//middlesesion 
// server.use(function(req,res,next){
//   res.locals.name=req.session.name;
//   res.locals.tybe=req.session.tybe;
// console.log(req.session.tybe,"----",req.session.name,"------",res.locals.name);
// if(req.session.tybe)
// {
//   // res.locals.name="hazem"
//   next();
// }else{
//    res.redirect("/login");

// }


// });///authen check




server.use("/admin",adminrouter)

// server.use(function(request,response,next){
// console.log(request.session.tybe,"7888787878787878")
// if(request.session.tybe&&request.session.tybe=="admin"){
  
//       next();
  

// }else{
//   request.flash('error','Not Allowed For  Login As An_Admin To Continue')
//   response.redirect("/login");
// }
// })//prevent speaker

server.use("/event",eventrouter);


server.post("/test",(request,response,next)=>{
  console.log("react",request.body)
  response.send('saved')

// next() 
})



//final ware
server.use(function(request,response,next){
  //last ware to get info 
console.log(request.method,"::::",request.url)

    response.send("Welcome to our Our website am in final mw ");
})



  module.exports=this.conectiondb;
  let testid =require("./router/testrouter.js");
let testidm =require("./models/testmodel");
