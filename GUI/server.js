const fileUpload = require("express-fileupload");
const path = require("path");
const bodyParser = require("body-parser");
const { spawn } = require("child_process"); // for calling python script which generates a result

const express = require("express");
const request = require('request');
const app = express();

const users = [
    { id: "admin", password: "admin" },
    { id: "guest1", password: "guest1" },
    { id: "johnsmith", password: "12345" },
    { id: "janedoe", password: "54321" },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var currentLoginId;

const PORT = 8080;

// default options
app.use(fileUpload());

app.get("/ping", function (req, res) {
    res.send("pong");
});

app.get("/", function (req, res) {
    var page = "/login.html";

    if (currentLoginId) {
        console.log("loginId", currentLoginId);
        page = "/index.html";
    }

    res.sendFile(path.join(__dirname + page));
});

app.post("/getUser", function (req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json",
    });

    res.end(
        JSON.stringify({
            loginId: currentLoginId,
        })
    );
});

app.post("/login", function (req, res) {
    var loginId = req.body.loginId;
    var password = req.body.password;
    var status = "fail";

    for (var i = 0; i < users.length; i++) {
        if (users[i].id == loginId && users[i].password == password) {
            currentLoginId = loginId;
            status = "success";
            break;
        }
    }

    res.writeHead(200, {
        "Content-Type": "application/json",
    });
    res.end(
        JSON.stringify({
            status: status,
        })
    );
});

app.post("/logout", function (req, res) {
    currentLoginId = undefined;
    res.writeHead(200, {
        "Content-Type": "application/json",
    });
    res.end(
        JSON.stringify({
            status: "success",
        })
    );
});

app.get('/getml', function(req, res) {
    var fname=req.query.filenom
    console.log("The id is"+fname)
    console.log("The filename being sent to flask is"+fname)
    var requesturl='http://127.0.0.1:5000/flask/'+fname
    console.log("The request url is "+requesturl)
    request(requesturl, function (error, response, body) {
        console.error('error:', error); // Print the error
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the data received
        res.send(body); //Display the response on the website
      });      
});

app.post("/upload", function (req, res) {
    let uploadedFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send("No files were uploaded.");
        return;
    }

    console.log("req.files >>>", req.files); // eslint-disable-line

    uploadedFile = req.files.myFile;

    uploadPath = __dirname + "\\uploads\\" + uploadedFile.name;

    uploadedFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(
            JSON.stringify({
              status: "success",
              path: uploadPath
            })
          );
        // in close event we are sure that stream from child process is closed
    });
});

app.use(express.static(__dirname));

// app.use("/api", router);

app.listen(PORT, function () {
    console.log("Server listening on port ", PORT); // eslint-disable-line
});
