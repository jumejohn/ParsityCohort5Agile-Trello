import axios from "axios";

export const deleteCard = (cardId, listId) => (dispatch) => {
  const token = localStorage.token;
  axios({
    method: "delete",
    url: `/cards/${cardId}`,
    headers: {'Authorization': `Bearer ${token}`},
    data: {
      listId: listId,
    }
  })
    .then((response) => {
      console.log(response)
      dispatch({ type: "UPDATE_LIST", payload: response.data })
    })
}
