import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../actions/DeleteComment'
import { updateComment } from '../actions/EditComment'
import { useForm } from 'react-hook-form'
import Comment from './Comment.js'

const CommentsDiplay = () => {
  const { reset, register, handleSubmit } = useForm()
  const currentCard =
    useSelector((state) => state.rootReducer.currentCard._id) || null
  const dispatch = useDispatch()
  const currentComments = useSelector(
    (state) => state.rootReducer.currentCard.cardComments
  )
  // console.log("cardCommentDisplay", currentComments);
  useEffect(() => {
    //load the card that is clicked
    renderComments()
  }, [])

  const handleDelete = (e) => {
    console.log('commentId', e.target.id)
    dispatch(deleteComment(e.target.id, currentCard))
    // renderComments();
  }

  const renderComments = () => {
    if (currentComments) {
      const displayedComments = currentComments.map((comment) => {
        // console.log('comment', comment)
        return (
          <div key={comment._id}>
            <Comment comment={comment} currentCard={currentCard} />
            <button
              id={comment._id}
              onClick={(e) => handleDelete(e)}
              className='btn submit-button ms-auto'
              type='button'
            >
              Delete Comment
            </button>
          </div>
        )
      })
      return displayedComments
    } else {
      return (
        <ul>
          <li>comments</li>
        </ul>
      )
    }
  }
  return renderComments()
}

export default CommentsDiplay
