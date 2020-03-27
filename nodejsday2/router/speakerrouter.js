const express = require("express");
var Crypter = require("cryptr");
crypter = new Crypter("devnami")

const speakerrouter = express.Router();

let mongoose = require("mongoose");
require("./../models/speakermodel");
require("./../models/eventmodel");

let speakermodel = mongoose.model("speaker");
let eventmodels=mongoose.model("event")

var flash = require('connect-flash');


///////////////////////////////////all routers /////////////////////////
speakerrouter.post("/add", function (request, response, next) {
    console.log(request.body)

    speakermodel.find({ username: request.body.username }).then((data) => {


        if (data.length == 0) {
            request.body.password = crypter.encrypt(request.body.password)


            // var speaker = new speakermodel({ _id:request.body.id,name:request.body.name,age:request.body.age,address:request.body.address });
            var speaker = new speakermodel(request.body)
            // Save the new model instance, passing a callback
            speaker.save()
                .then((data) => { console.log("done"); 
                request.flash('error','login now with your data')
                request.session.tybe='speaker';
                request.session.name=data.fullname
                request.session.idval=data._id
                response.redirect("/speaker/profile?_id=" + data._id) })
                .catch((err) => { 
                    request.flash('error','the age must be in range 20 to 60')
                    response.redirect('#')
                    console.log(err + "") });

        } else {
            id = data[0]._id;
            request.flash('error','the user name exit must be one alse')
            response.redirect("/login");

        }

    });


})//speaker / add
///////////////////get add 

speakerrouter.get("/add", function (request, response, next) {


    error = request.flash().error || [];

    response.render("speaker/speakeradd.ejs", { error });



})//speaker / add


//////////////////


//////middlesesion 
// speakerrouter.use(function (req, res, next) {
//     if (req.session.tybe) {
//         res.locals.name = req.session.name;
//         res.locals.tybe = req.session.tybe;
//         res.locals.id=req.session.sp_id;
//         next();
//     } else {
//         res.redirect("/login");
//     }
// });///authen check
//////////////midle ware

speakerrouter.get("/profile/:_id?", function (request, response, next) {

    error = request.flash().error || [];
    speakermodel.find(request.query)
        .then((data) => {
            // response.send(data)
            if (data.length > 0) {
                console.log(data[0])

                eventmodels.find({ $or: [{ otherspeaker: data[0]._id }, { mainspeaker: data[0]._id }] }).populate({ path: "mainspeaker otherspeaker" })

                    .then((data1) => {

                        data[0].events = data1;
                        response.render("speaker/speakerprofile.ejs", data[0])
                    })
                    .catch((err) => { console.groupCollapsed(err + "") });




                // response.render("speaker/speakerprofile.ejs", data[0])

            } else {
                request.flash('error', 'not allowed and not found id')
                response.redirect("/login")
            }



        })//response 
        .catch((err) => { console.log(err + "") })
})//speaker / profile


//////////list speaker
speakerrouter.get("/list", function (request, response, next) {

        speakermodel.find({}).then((data) => {
        console.log(data);
        // response.renseder("speaker/speakerlist.ejs", { speakers: data })
        response.send(data)
    })
        .catch((err) => { console.groupCollapsed(err + "") });

   



})//speaker / profile//list






speakerrouter.get("/delete/:_id?", function (request, response, next) {
    console.log(request.body)
// console.log("im here deleeeeeting ",request.session.tybe)
    // Save the new model instance, passing a callback
    // if(request.session.tybe=="admin")
    // {
         speakermodel.deleteOne(request.query)
        .then((data) => { 
            eventmodels.update({},{$pull:{otherspeaker:request.query._id}},{multi:true}).then((data1)=>{
                console.log(data1)
                console.log("done"); response.send("deleted") 
            }).catch((err)=>{console.log(err+"")})
            })
        .catch((err) => { console.log(err + "") });
    // }else{
    //     request.flash('error','not allowed login as admin to delet');
    //     response.redirect("/login")
    // }
   

})//speaker / delet


speakerrouter.post("/update", function (request, response, next) {
    console.log(request.body)
    var id = request.body._id;
    delete request.body._id;
    if (request.body.password){
        request.body.password = crypter.encrypt(request.body.password);
    }else{
        delete request.body.password;
    }
       
    
    //Save the new model instance, passing a callback
    speakermodel.updateOne({ _id: id }, { $set: request.body })
        .then((data) => { console.log("done"); response.redirect("/speaker/profile?_id=" + id) })
        .catch((err) => { console.log(err + "") });

})//speaker / update






speakerrouter.get("/update/:_id?", function (request, response, next) {

    speakermodel.find(request.query)
        .then((data) => {
            // response.send(data)
            // if (request.query._id == request.session.idval||request.session.tybe=="admin")
             { response.render("speaker/speakeredit.ejs", data[0]); }
            // else {
            //     request.flash('error', 'u  must login with user Name is ' + data[0].username)
            //     response.redirect("/login")
            // }


        })//response 
        .catch((err) => { console.log(err + "") })





})//speaker / add




//cancell
speakerrouter.get("/cancel/:sp_id?/:ev_id?", function (request, response, next) {

    error = request.flash().error || [];
   


    // if (request.query._id == request.session.idval) {
        speakermodel.find({ _id: request.query.sp_id })
            .then((data) => {
                // response.send(data)
                if (data.length > 0) {
                    eventmodels.updateOne({ _id: request.query.ev_id }, { $set: { mainspeaker: null },$pull:{otherspeaker:request.query.sp_id} }).then(() => {



                        eventmodels.find({ mainspeaker: data[0]._id }).populate({ path: "mainspeaker otherspeaker" })

                            .then((data1) => {

                                data[0].events = data1;
                                response.render("speaker/speakerprofile.ejs", data[0])
                            })
                            .catch((err) => { console.groupCollapsed(err + "") });
                    })





                    // response.render("speaker/speakerprofile.ejs", data[0])

                } else {
                    request.flash('error', 'not allowed')
                    response.redirect("/login")
                }



            })//response 
            .catch((err) => { console.log(err + "") })
    // } else {
    //     request.flash('error', 'not allowed u must login with the same user to cancel')
    //     response.redirect("/login")
    // }
})//speaker / cancel





module.exports = speakerrouter;



