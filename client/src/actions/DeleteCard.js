import axios from "axios";

export const DELETE_CARD = "DELETE_CARD";
export const deleteCard = (cardId, listId) => (dispatch) => {
  const token = localStorage.token;
  axios({
    method: "delete",
    url: `/cards/${cardId}`,
    headers: {'Authorization': `Bearer ${token}`},
  })
    .then(() => dispatch({ 
      type: DELETE_CARD, 
      payload: {
        cardId: cardId,
        listId: listId,
      }
    }))
}
