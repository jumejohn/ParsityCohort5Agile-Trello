import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateComment } from '../actions/EditComment'

const Comment = ({ comment, currentCard }) => {
  const dispatch = useDispatch()
  const [currentCommentText, setCurrentCommentText] = useState(
    comment.commentText
  )
  const [updatedComment, setUpdatedComment] = useState(false)
  // console.log(comment)
  const handleUpdate = (e, comment) => {
    e.preventDefault()
    dispatch(updateComment(currentCommentText, comment, currentCard))
    setUpdatedComment(false)
  }
  const handleTyping = (e) => {
    e.preventDefault()
    setCurrentCommentText(e.target.value)
    setUpdatedComment(true)
  }

  return (
    <div className='comment-user' key={comment._id}>
      <h5>
        <strong className='comment-username'>
          {comment.commentUser} says:
        </strong>
      </h5>

      <form className='comment-update-form'>
        <label htmlFor='comment'></label>
        <textarea
          className='comment-update-text'
          type='text'
          id='comment'
          rows={currentCommentText.length / 50 + 1}
          value={currentCommentText}
          onChange={(event) => handleTyping(event)}
        />
        <button
          style={{ display: updatedComment ? 'block' : 'none' }}
          id={comment._id}
          onClick={(e) => handleUpdate(e, comment)}
          className='btn submit-button ms-auto comment-update-button'
          type='submit'
        >
          Update Comment
        </button>
      </form>
    </div>
  )
}

export default Comment
