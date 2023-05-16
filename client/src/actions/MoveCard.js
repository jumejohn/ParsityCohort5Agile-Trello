import axios from "axios";
import _ from 'lodash'
import { FETCH_BOARD } from "./BoardFetch";
import { axiosAuth } from "../utils/axiosAuth";
export const MOVE_CARD = "MOVE_CARD";
export const moveCard = (boardId, token, newLists, order, oldLists, board) => (dispatch) => {
  const url = `/boards/${boardId}/lists`;

  const updatedLists = newLists
  const containers = order
  const previousLists = oldLists  
  const newData = containers.map((id) => {
    // fill lists with: 
    // _id
    // cards : [ cardID strings...]

    // const listName = previousLists.find(list => list._id == id).listName
    const cards = updatedLists[id]
    return {
      _id: id,
      cards
    }
  })
  
  return axiosAuth( { 
      method: "put",
      url,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        lists: newData
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
