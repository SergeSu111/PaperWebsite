const express = require("express");
const app = express();
const multer = require("multer"); // just pasing the formData type requests. 
const bcrypt = require("bcrypt");
const { peerProxy } = require("./peerProxy.js");
const cookieParser = require("cookie-parser");
const db = require("./db.js"); // call db file
app.use(express.static("public"));
app.set("trust proxy", true); // for websokect
const port = process.argv.length > 2 ? process.argv[2] : 4001;
const upload = multer({});
// use express to use json() to make the response and required body as json
app.use(express.json());
app.use(cookieParser()); // to process cookie 
const authCookieName = "token"; // set the cookieheader as token? 


// uploard.none() menas just submitting text.
app.post("/submit_form/:username", upload.none(), (req, res) =>
{
    try{
        const my_username = req.params.username;
        const formData = req.body;
        db.submitForm(formData, my_username); // putting formData into database.
        res.sendStatus(200);
    }
    catch (error)
    {
        res.status(400).send(error.message);
    }
});


const httpService = app.listen(4001, () =>
{
    console.log("Listening yor 4001");
});

peerProxy(httpService);




