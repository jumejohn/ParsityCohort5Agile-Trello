import axios from 'axios'
import { axiosAuth } from '../utils/axiosAuth'
export const UPDATE_CARD = 'UPDATE_CARD'

export const postComment = (comment, currentCard) => (dispatch) => {
  const token = localStorage.token
  const cardId = currentCard._id
  console.log('this is the comment', comment)
  axiosAuth({
    method: 'post',
    url: `/cards/${cardId}/comment`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      username: comment.commentUser,
      commentText: comment.commentText,
    },
  }).then((response) => {
    // console.log("this response", response);
    dispatch({ type: UPDATE_CARD, payload: response.data })
  })
}
