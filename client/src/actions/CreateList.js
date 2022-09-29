import axios from "axios";

export const CREATE_LIST = "CREATE_LIST";
export const createList = (title) => (dispatch) => {
  const token = localStorage.token;
  axios({
    method: "post",
    url: `http://localhost:8000/lists/`,
    headers: {'Authorization': `Bearer ${token}`},
    data: {
      listName: title,
      // cards: [],
    },
  })
    .then((response) => {
      console.log("response", response);
      dispatch({ type: CREATE_LIST, payload: response.data })
    })
}
