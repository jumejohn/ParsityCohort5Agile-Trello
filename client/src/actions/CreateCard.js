import axios from "axios";

export const CREATE_CARD = "CREATE_CARD";
export const createCard = (cardTitle, listId) => (dispatch) => {
  const token = localStorage.token;
  axios({
    method: "post",
    url: "https://parsitycohort5agile-trello-production.up.railway.app/cards/",
    headers: {'Authorization': `Bearer ${token}`},
    data: {
      cardTitle: cardTitle,
      listId: listId,
      cardLabel: [],
    },
  })
    .then((response) => {
      dispatch({ type: CREATE_CARD, payload: response.data })
    })
};
