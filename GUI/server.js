const fileUpload = require("express-fileupload");       // to access express-fileupload package from node
const path = require("path");       // to access path module from node
const bodyParser = require("body-parser");      // to access body-parser object from node
const { spawn } = require("child_process");     // for calling python script which generates a result

const express = require("express");     // for express framework module from node
const request = require('request');     // to access request package from node
const app = express();      // create an express application

// array of user id and password pairs
const users = [
    { id: "admin", password: "admin" },
    { id: "guest1", password: "guest1" },
    { id: "johnsmith", password: "12345" },
    { id: "janedoe", password: "54321" },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var currentLoginId;     // current login ID

const PORT = 8080;      // connections come through http://localhost:8080

// default options
app.use(fileUpload());

// /ping GET request
app.get("/ping", function (req, res) {
    res.send("pong");
});

// default GET request redirects to /login.html
app.get("/", function (req, res) {
    var page = "/login.html";

    // if there is a current login, redirect to index.html
    if (currentLoginId) {
        console.log("loginId", currentLoginId);
        page = "/index.html";
    }

    // transfer file at the given path
    res.sendFile(path.join(__dirname + page));
});

// getting user name POST request
app.post("/getUser", function (req, res) {
    // write header of response to serve client(second argument); 200 is status code OK (first argument)
    res.writeHead(200, {
        "Content-Type": "application/json",
    });

    res.end(
        JSON.stringify({
            loginId: currentLoginId,
        })
    );
});

// login POST request
app.post("/login", function (req, res) {
    var loginId = req.body.loginId;
    var password = req.body.password;
    var status = "fail";

    // if username and password matches users in given users[] array, login is successful
    for (var i = 0; i < users.length; i++) {
        // username and password are checked iteratively through each pair in users[]
        if (users[i].id == loginId && users[i].password == password) {
            currentLoginId = loginId;
            status = "success";
            break;
        }
    }

    // write header of response to serve client(second argument); 200 is status code OK (first argument)
    res.writeHead(200, {
        "Content-Type": "application/json",
    });
    res.end(
        JSON.stringify({
            status: status,
        })
    );
});

// logout POST request
app.post("/logout", function (req, res) {
    currentLoginId = undefined;
    // write header of response to serve client(second argument); 200 is status code OK (first argument)
    res.writeHead(200, {
        "Content-Type": "application/json",
    });
    res.end(
        JSON.stringify({
            status: "success",
        })
    );
});

// get results GET request
app.get('/getml', function (req, res) {
    var fname = req.query.filenom
    console.log("The id is" + fname)
    console.log("The filename being sent to flask is" + fname)
    //Sends it to local console. Hard coded for this project but future will change this to the server link
    var requesturl = 'http://127.0.0.1:5000/flask/' + fname
    console.log("The request url is " + requesturl)
    request(requesturl, function (error, response, body) {
        console.error('error:', error);     // Print the error
        console.log('statusCode:', response && response.statusCode);    // Print the response status code if a response was received
        console.log('body:', body);     // Print the data received
        res.send(body);     //Display the response on the website
    });
});

// upload file POST request
app.post("/upload", function (req, res) {
    let uploadedFile;
    let uploadPath;

    // if the JavaScript req.files object has a length of 0, indicate to the user
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send("No files were uploaded.");
        return;
    }

    // eslint-disable-line
    console.log("req.files >>>", req.files);

    // initialize uploadedFile to the uploaded file
    uploadedFile = req.files.myFile;

    // set the path for the file to be uploaded to using the uploads folder in the current directory
    uploadPath = __dirname + "\\uploads\\" + uploadedFile.name;

    uploadedFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        // write header of response to serve client(second argument); 200 is status code OK (first argument)
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

// listening on port 8080
app.listen(PORT, function () {
    console.log("Server listening on port ", PORT); // eslint-disable-line
});
