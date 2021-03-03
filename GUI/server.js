const fileUpload = require("express-fileupload");
const path = require("path");
const bodyParser = require("body-parser");
const { spawn } = require("child_process"); // for calling python script which generates a result

const express = require("express");
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
        
        var pythonResult;
        // spawn new child process to call the python script
        const python = spawn(
          "C:\\Program Files (x86)\\Microsoft Visual Studio\\Shared\\Python37_64\\python",
          ["script.py"]
        );
        // collect data from script
        python.stdout.on("data", function (data) {
          console.log("Pipe data from python script ..." + data);
          pythonResult = data.toString();
    
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(
            JSON.stringify({
              status: "success",
              path: uploadPath,
              result: pythonResult,
            })
          );
        });
        // in close event we are sure that stream from child process is closed
        python.on("close", (code) => {
          console.log(`child process close all stdio with code ${code}`);
        });
    });
});

app.use(express.static(__dirname));

// app.use("/api", router);

app.listen(PORT, function () {
    console.log("Server listening on port ", PORT); // eslint-disable-line
});
