import axios from "axios";
import { UPDATE_CARD } from "./PostComment";

export const editCardModalTitle = (newTitle, currentUser) => (dispatch) => {
  const token = localStorage.token;
  const cardId = localStorage.card;
  // console.log("action", newTitle);
  axios({
    method: "put",
    url: `https://parsitycohort5agile-trello-production.up.railway.app/cards/${cardId}/updatetitle`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      cardTitle: newTitle.cardTitle,
      username: currentUser,
    },
  }).then((response) => {
    // console.log(response);
    dispatch({ type: UPDATE_CARD, payload: response.data });
  });
};
