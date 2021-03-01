// move into appropriate server directory

var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var bodyParser = require('body-parser');

http.createServer(function (req, res) {
    if (req.url == '/upload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log('files', files)

            if (files && files.myFile) {
                var oldpath = files.myFile.path;
                var newpath = __dirname + '\\' + files.myFile.name;

                fs.rename(oldpath, newpath, function (error) {
                    if (error) {
                        console.error(error)
                        res.writeHead(500, {
                            'Content-Type': 'application/json'
                        })
                        res.end(JSON.stringify({ status: 'error', message: error }))
                        return
                    }

                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    res.end(JSON.stringify({ status: 'success', path: newpath }))
                });
            }
        });
    }
    else 
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('');
        return res.end();
    }
}).listen(8080);