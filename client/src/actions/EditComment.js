import axios from 'axios'
import { axiosAuth } from '../utils/axiosAuth'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

export const updateComment =
  (newCommentText, comment, currentCard) => (dispatch) => {
    const token = localStorage.token
    const cardId = currentCard
    console.log('this is the comment', comment)
    axiosAuth({
      method: 'put',
      url: `/cards/${cardId}/comment/${comment._id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        username: comment.commentUser,
        commentText: newCommentText,
      },
    }).then((response) => {
      dispatch({ type: UPDATE_COMMENT, payload: response.data })
    })
  }
