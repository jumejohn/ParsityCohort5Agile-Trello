import axios from "axios";
import { FETCH_BOARD } from "./BoardFetch";
export const MOVE_LIST = "MOVE_LIST";
export const moveLists = (boardId, token, newOrder, oldLists, username, board) => (dispatch) => {
  const url = `/boards/${boardId}`;

  const order = newOrder
  const lists = oldLists
  const user = username
  const newLists = order.map(id => {
    return lists.find(list => list._id == id)
  })

  const newBoard = {...board, lists: newLists}


  return axios( { 
      method: "put",
      url,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        boardName: newBoard.boardName,
        users: newBoard.users,
        lists: newLists,
        labels: newBoard.labels
      } })
    .then(function (response) {
      dispatch({
        type: FETCH_BOARD,
        payload: response.data,
      });
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
