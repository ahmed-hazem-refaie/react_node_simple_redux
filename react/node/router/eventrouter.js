let express = require("express");

let eventrouter = express.Router();


let mongoose = require("mongoose");
require("./../models/eventmodel");

eventmodel = mongoose.model("event");
speakermodel = mongoose.model("speaker");


//profile it must be the same name to show if in speajer show 
eventrouter.get("/profile/:_id?", function (request, response, next) {


  // speakermodel.find()
  console.log(request.query._id)
  eventmodel.find(request.query).populate({ path: "mainspeaker otherspeaker" })
    .then((data) => {
      console.log(data[0])
      response.render("event/eventprofile.ejs", data[0])
    })
    .catch((err) => { console.log(err + "") })
})//event / profile

eventrouter.get("/list", function (request, response, next) {

  eventmodel.find({}).populate({ path: "mainspeaker otherspeaker" })
    .then((data) => { response.render("event/eventlist.ejs", { events: data }) })
    .catch((err) => { console.groupCollapsed(err + "") });



})//event / profile//list


eventrouter.post("/add", function (request, response, next) {
  console.log(request.body)

  // var speaker = new speakermodel({ _id:request.body.id,name:request.body.name,age:request.body.age,address:request.body.address });
  var event = new eventmodel(request.body)
  // Save the new model instance, passing a callback
  event.save()
    .then((data) => { console.log("done"); response.redirect("/event/profile?_id=" + data._id) })
    .catch((err) => { console.log(err + "") });

})//event / add



eventrouter.get("/delete/:_id?", function (request, response, next) {
  console.log(request.body, "fe eh ba2a")


  // Save the new model instance, passing a callback
  eventmodel.deleteOne(request.query)
    .then((data) => { console.log("done"); response.redirect("/event/list") })
    .catch((err) => { console.log(err + "") });

})//event / delet


eventrouter.post("/update", function (request, response, next) {

  var id = request.body._id;
  delete request.body._id;
  console.log(request.body, "hh")
  //Save the new model instance, passing a callback
  eventmodel.updateOne({ _id: id }, { $set: request.body })
    .then((data) => { console.log("done"); response.redirect("/event/profile?_id=" + id) })
    .catch((err) => { console.log(err + "") });

})//event / update



eventrouter.get("/add", function (request, response, next) {



  speakermodel.find().then((data) => { response.render("event/eventadd.ejs", { speakers: data }) })



    .catch((err) => { err + "" })




})//event / add


eventrouter.get("/update/:_id?", function (request, response, next) {
  let arr = []
  let title = "";
  let date = "";
  let id = request.query._id;

  eventmodel.find(request.query).then((data) => {
    console.log(data[0], 105)
    arr = data[0].otherspeaker;
    title = data[0].title;
    date = data[0].date
    ////////////////////////////////////inside get speaker
    speakermodel.find().then((data1) => {

      // console.log(arr,title,date,id)

      arr.forEach((item) => {

        selectedobj = data1.find((obj) => {
          return obj._id == item;
        });
        
        if(selectedobj.username)
        selectedobj.username = "selected";
        console.log(selectedobj);
      })///find
      response.render("event/eventedit.ejs", { speakers: data1, eventtitle: title, eventdate: date, _id: id })

    })//finish
  })//find selected
    .catch((err) => { console.log(err + "") })

})//event / update









module.exports = eventrouter;