const mongoose = require('mongoose')

const List = require('../models/List')
const User = require('../models/User')

const createComment = async (userId, comment) => {
  const user = await User.find({ _id: userId}).exec()
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