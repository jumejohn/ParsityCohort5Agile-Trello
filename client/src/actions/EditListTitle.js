import axios from "axios";

export const editListTitle = (newTitle, listId, cards) => (dispatch) => {
  const token = localStorage.token;
  axios({
    method: "put",
    url: `/lists/${listId}`,
    headers: {'Authorization': `Bearer ${token}`},
    data: {
      listName: newTitle,
      cards: cards,
    },
  })
    .then((response) => {
      console.log(response);
      dispatch({type: "UPDATE_LIST", payload: response.data});
    })
}
