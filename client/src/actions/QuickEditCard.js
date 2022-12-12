import axios from "axios";

export const quickEditCard =
  (cardId, listId, newCardTitle, cardLabel, cardDescription, cardComments) =>
  (dispatch) => {
    const token = localStorage.token;
    axios({
      method: "put",
      url: `https://parsitycohort5agile-trello-production.up.railway.app/cards/${cardId}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        listId: listId,
        cardTitle: newCardTitle,
        cardLabel: cardLabel,
        cardDescription: cardDescription,
        cardComments: cardComments,
      },
    }).then((response) => {
      // console.log(response);
      dispatch({ type: "UPDATE_LIST", payload: response.data });
    });
  };
