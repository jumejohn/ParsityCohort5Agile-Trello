import axios from "axios";
import { axiosAuth } from "../utils/axiosAuth";

export const editListTitle = (newTitle, listId, cards) => (dispatch) => {
  const token = localStorage.token;
  axiosAuth({
    method: "put",
    url: `/lists/${listId}`,
    headers: {'Authorization': `Bearer ${token}`},
    data: {
      listName: newTitle,
      cards: cards,
    },
  })
    .then((response) => {
      // console.log(response);
      dispatch({type: "UPDATE_LIST", payload: response.data});
    })
}
