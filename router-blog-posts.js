'use strict';
// this router is for endpoint '/blog'

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
 
const {BlogPost} = require('./models');

router.use(jsonParser);

router.get('/', (req, res) => {
  // show all blog posts
  BlogPost
    .find()
    // .limit(10)
    .then( blogposts => {
      console.log(blogposts);
      res.status(200).json({
        blogposts: blogposts.map(
          (blogpost) => blogpost.apiFormat()
        )
      }); // we can edit this with apiRepr later
    });
});

// router.get('/:id', (req, res) => {
//   // show all blog posts
//   BlogPost
//     .findById(req.params.id)
//     .then( blogposts => {
//       res.json(blogposts); // we can edit this with apiRepr later
//     });
// });

router.put('/:id', (req, res) => {
  // show all blog posts
  BlogPost
    .findByIdAndUpdate(req.params.id,
      { $set: { title: req.body.title } },
      function(err , blogposts) {
        if (err) return res.err(err);
        res.json(blogposts); // we can edit this with apiRepr later
      });
});

router.delete('/:id', (req, res) => {
  // show all blog posts
  BlogPost
    .findByIdAndRemove(req.params.id)
    .then( blogposts => {
      res.json(blogposts); // we can edit this with apiRepr later
    });
});

router.post('/', (req, res) => {
  // show all blog posts
  BlogPost
    .create({
      title: req.body.title,
      author: {
        lastName: req.body.lastName,
        firstName: req.body.firstName
      },
      content: req.body.content
    })
    .then( blogposts => {
      res.json(blogposts); // we can edit this with apiRepr later
    });
});

//const blogPostRouter = router;
module.exports = router;
// module.exports = {BlogPost, blogPostRouter};