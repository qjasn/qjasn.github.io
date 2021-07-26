runserver(8080)
function runserver(serve) {
    var http = require('http');
    var fs = require('fs');
    var url = require('url');
    var path = require('path');


    var pathname;
    http.createServer(function (request, response) {
        pathname = url.parse(request.url).pathname;

        console.log("Request for " + pathname + " received.");
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                if (pathname == "/") {
                    fs.readFile('index.html', function (err, data) {
                        if (err) {

                            console.log(err);
                            // Content Type: text/html
                            response.writeHead(404, { 'Content-Type': 'text/html' });
                            response.write('cannnot find index.html')
                        } else {

                            //text
                            // Content Type: text/html
                            response.writeHead(200, { 'Content-Type': 'text/html' });
                            response.write(data.toString());
                        }
                    })
                } else {
                    console.log(err);
                    // Content Type: text/html
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.write('cannnot find')
                }
            } else {
                if (path.extname(pathname) == ".mp3") {
                    //audio
                    //Content Type:audio/mp3
                    response.writeHead(200, { 'Content-Type': 'audio/mp3' });
                    response.write(data)
                } else if (path.extname(pathname) == ".jpeg") {
                    //picture
                    //Content Type:image/jpeg
                    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    response.write(data);
                } else {
                    //text
                    // Content Type: text/html
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(data.toString());
                }
                //console.log(path.extname(pathname))
            }
            response.end();
        });
    }).listen(serve);
    console.log('Server running at http://127.0.0.1:' + serve + '/');
}