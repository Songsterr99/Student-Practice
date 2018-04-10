const http = require('http');
const fs = require('fs');



http.createServer(function (request, response) {
  const url = request.url;
  fs.readFile('./' + url, function(err, data) {
    if (err) {/*
      fs.readFile('./public/error404.html', function (err2, data2) {
        if(err2){
          response.writeHead(404, "Not Found");
          response.end();
        }
        else{
          response.writeHead(200, {'Content-type' : 'text/html'});
          response.end(data2);
        }
      });*/
    }
    else{
      const dotoffset = url.lastIndexOf('.');
      const mimetype = dotoffset == -1
        ? 'text/plain'
        : {
          '.html' : 'text/html',
          '.ico' : 'image/x-icon',
          '.jpg' : 'image/jpeg',
          '.png' : 'image/png',
          '.gif' : 'image/gif',
          '.css' : 'text/css',
          '.js' : 'text/javascript'
        }[ url.substr(dotoffset) ];
      response.setHeader('Content-type' , mimetype);
      response.end(data);
      console.log( url, mimetype );
    }
  });
}).listen(5050);

console.log('Server started listening on 5050');
