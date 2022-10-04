const mongoose = require('mongoose')

const List = require('../models/List')

const createComment = (user, comment) => {
  const newComment = {commentText: comment, commentUser: user}
  return newComment
}

const createActivityLog = (userId, listId) => {
  
  const time = new Date()
  // const user = userId
  const newList = listId
  const logEntry = `User ${userId} saved to ${newList} at ${time}`
  return logEntry
}

module.exports = {createComment, createActivityLog}