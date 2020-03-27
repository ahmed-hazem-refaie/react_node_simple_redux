const express = require("express");
var Crypter = require("cryptr");
crypter = new Crypter("devnami")
let session = require("express-session");
const authenticationRouter = express.Router();
let path = require("path");
let mongoose = require("mongoose");
require("../models/speakermodel")
let speakermodel = mongoose.model("speaker");
var flash = require('connect-flash');


authenticationRouter.post("/login", function (request, response) {

    console.log(request.method, ":<><><>", request.url);

    //////get data in submit form 
    console.log(request.body)
    submitdata = request.body;

    console.log(submitdata.userName, "   ", submitdata.password);



    if (submitdata.userName == "hazem" && submitdata.password == "234") {
        request.session.tybe = "admin";
        request.session.name = "HAZEM...Admin";

        response.redirect("/admin/profile");

    } else {


        //    console.log(pss)
        speakermodel.find({ username: submitdata.userName }).then((data) => {
            let pss = 0;

            if (data.length == 0) {
                request.flash('error', "the user not found yet in our site ")
                response.redirect("/login");
            } else {
                console.log(data[0].password);
                pss = crypter.decrypt(data[0].password);
                if (submitdata.password == pss) {
                    id = data[0]._id;
                    request.session.tybe = "speaker";
                    request.session.name = data[0].fullname;
                    request.session.idval = data[0]._id;

                    response.redirect("/speaker/profile?_id=" + id);

                } else
                    request.flash('error', "passsword is not true plz write it again")
                response.redirect("/login");

            }

        });

    }


})//login 

authenticationRouter.get("/login", function (request, response, next) {

    error = request.flash().error || [];
    console.log(request.session.name)
    response.render("authentication/login1.ejs", { error })
}); //authentication get login get 


authenticationRouter.get("/logout", function (request, response, next) {
    request.session.destroy();
    response.redirect("/login");
})//logout
module.exports = authenticationRouter;

