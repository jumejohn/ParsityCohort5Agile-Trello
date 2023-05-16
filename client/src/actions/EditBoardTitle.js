import axios from 'axios';
import { axiosAuth } from '../utils/axiosAuth';

export const UPDATE_BOARD = 'UPDATE_BOARD';
export const editBoardTitle = (newDescription, boardId) => (dispatch) => {
  const token = localStorage.token;
  // const cardId = localStorage.card;
  console.log('action!!!', newDescription);
  axiosAuth({
    method: 'put',
    url: `/boards/${boardId}/updatedescription`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      boardDescription: newDescription.boardDescription,
      // username: currentUser,
    },
  }).then((response) => {
    console.log(response);
    dispatch({ type: UPDATE_BOARD, payload: response.data });
  });
};
