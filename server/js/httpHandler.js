const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (messages) => {
  messageQueue = messages;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET') {
    if (req.path === '/background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (error, data) => {
        if (error) {
          res.writeHead(404, headers);

        } else {
          res.writeHead(200, headers);

        }
        res.end();
        next();
      })
      // http://127.0.0.1:3000/background.jpg
    } else {
      res.writeHead(200, headers);
      res.end(messageQueue.dequeue());
      console.log(req.path);
      next();
    }
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  }

  if (req.method === 'POST') {
  //   options = {
  //     host: 'http://127.0.0.1'
  //   , port: 3000
  //   , path: '/background.jpg'
  // }
  // read the file and rememeber the path


    fs.writeFile(module.exports.backgroundImageFile, null, (error) => {
      if (error) {
        console.log('error');
      } else {
        res.
        console.log('file written successfully');
      }
    })
    res.end(module.exports.backgroundImageFile);
    }
  };
