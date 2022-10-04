const mongoose = require('mongoose');

const List = require('../models/List');

const createComment = (user, comment) => {
  const newComment = { commentText: comment, commentUser: user };
  return newComment;
};

const createActivityLog = (username, listId) => {
  const time = new Date();
  // const user = userId
  const newList = listId;

  // List.findById(listId).exec((err, list) => {
  //   if (err) return next(err);

  //   console.log(list);
  //   let newList = list.listName;
  //   // console.log(logEntry);
  // });
  const logEntry = `User ${username} saved to ${newList} at ${time}`;

  return logEntry;
};

module.exports = { createComment, createActivityLog };
