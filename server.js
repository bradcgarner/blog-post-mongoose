'use strict';
/* global DATABASE_URL, PORT */

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

const app = express();

const router = require('./router-blog-posts');

app.use(morgan('common'));

app.use(express.static('public'));

// default generic general visitor, not API
// app.get('/', (req, res) => {
//   // show all blog posts
//   BlogPost
//     .find()
//     .limit(10)
//     .then( blogposts => {
//       res.json(blogposts); // we can edit this with apiRepr later
//     });
// });

app.use('/blog', router);

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}.`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => { // why don't we catch errors from disconnect?
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => { // why does this take 1 arg?
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};