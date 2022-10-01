import axios from "axios";

export const quickEditCard = (cardId, listId, newCardTitle, cardLabel, cardDescription) => (dispatch) => {
  const token = localStorage.token;
  axios({
    method: "put",
    url: `/cards/${cardId}`,
    headers: { 'Authorization': `Bearer ${token}` },
    data: {
      listId: listId,
      cardTitle: newCardTitle,
      cardLabel: cardLabel,
      cardDescription: cardDescription,
    }
  })
    .then((response) => dispatch({ type: "UPDATE_LIST", payload: response.data }))
}
