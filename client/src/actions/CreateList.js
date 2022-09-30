import axios from "axios";

export const CREATE_LIST = "CREATE_LIST";
export const createList = (title, boardId) => (dispatch) => {
  const token = localStorage.token;
  axios({
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
