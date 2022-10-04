const mongoose = require('mongoose');

const List = require('../models/List');

const createComment = (user, comment) => {
  const newComment = { commentText: comment, commentUser: user };
  return newComment;
};

const createActivityLog = (username, list) => {
  const time = new Date();
  const logEntry = `User ${username} saved to ${list} at ${time}`;

  return logEntry;
};

module.exports = { createComment, createActivityLog };