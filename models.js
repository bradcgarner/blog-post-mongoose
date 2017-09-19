'use strict';

const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {
    firstName: String,
    lastName: {type: String, required: true}
  },
  content: {type: String, required: true}
});

blogPostSchema.virtual('name').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.apiFormat = function() {
  return {
    title: this.title,
    author: this.name,
    content: this.content
  };
};

const BlogPost = mongoose.model('Blogpost', blogPostSchema);

module.exports = {BlogPost};