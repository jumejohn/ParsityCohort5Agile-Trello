import axios from "axios";
import { LOAD_CARD } from "./LoadCard";

export const postComment = (comment, currentCard) => (dispatch) => {
  const token = localStorage.token;
  currentCard.comments.push(comment);
  console.log("currentCard comments", currentCard.comments);
  const cardId = currentCard._id;
  axios({
    method: "put",
    url: `/cards/${cardId}`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      cardComments: [...state.cardComments, comment],
    },
  }).then((response) => dispatch({ type: LOAD_CARD, payload: response.data }));
};
