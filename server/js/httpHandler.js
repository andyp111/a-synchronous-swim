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
    res.writeHead(200, headers);
    res.end(messageQueue.dequeue());
    next();
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();

    next();

  }

  // if (req.method === 'GET') {
  //   if (req.path === '/') {
  //     console.log('hello andy');
  //     res.writeHead(200, headers);
  //     res.write(messageQueue.dequeue());
  //     res.end();
  //     console.log(messageQueue);
  //     next();

  //   } else if (req.path === '/background.jpg') {
  //     fs.readFile(module.exports.backgroundImageFile, (error, data) => {
  //       if (error) {
  //         res.writeHead(404, headers);
  //       } else {
  //         res.writeHead(200, data);
  //       }
  //     });
  //     res.end();
  //     next();
  //   }
  // }
  // if (req.method === 'POST') {
  //   // buffer.alloc; getFile, writeFile
  // }

  // res.writeHead(200, headers);
  // res.end();
  // next();
};
