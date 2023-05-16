import axios from "axios";
import { axiosAuth } from "../utils/axiosAuth";

export const CREATE_LIST = "CREATE_LIST";
export const createList = (title, boardId) => (dispatch) => {
  const token = localStorage.token;
  axiosAuth({
    method: "post",
    url: "/lists/",
    headers: {'Authorization': `Bearer ${token}`},
    data: {
      listName: title,
      board: boardId,
    },
  })
    .then((response) => {
      console.log("response", response);
      dispatch({ type: CREATE_LIST, payload: response.data })
    })
}
