'use strict';
// this router is for endpoint '/blog'

const bodyParser = require('body-parser');

router.use(bodyParser.json());

app.get('/:id', (req, res) => {
  // show all blog posts
  BlogPosts
    .findById(req.params.id)
    .then( blogposts => {
      res.json(blogposts); // we can edit this with apiRepr later
    });
});

app.put('/:id', (req, res) => {
  // show all blog posts
  BlogPosts
    .findById(req.params.id)
    .then( blogposts => {
      res.json(blogposts); // we can edit this with apiRepr later
    });
});

app.delete('/:id', (req, res) => {
  // show all blog posts
  BlogPosts
    .findById(req.params.id)
    .then( blogposts => {
      res.json(blogposts); // we can edit this with apiRepr later
    });
});

app.post('/', (req, res) => {
  // show all blog posts
  BlogPosts
    .findById(req.params.id)
    .then( blogposts => {
      res.json(blogposts); // we can edit this with apiRepr later
    });
});

module.exports = blogPosts;