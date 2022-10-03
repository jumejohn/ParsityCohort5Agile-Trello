import axios from "axios";
import { LOAD_CARD } from "./LoadCard";

export const postComment = (comment, currentCard) => (dispatch) => {
  console.log("action currentCard", currentCard);
  const token = localStorage.token;
  const comments = currentCard.cardComments;
  console.log("postcommentscurrentCard", comments);
  comments.push(comment);
  console.log("currentCard comments", comments);
  const cardId = currentCard._id;
  axios({
    method: "put",
    url: `/cards/${cardId}`,
    headers: { Authorization: `Bearer ${token}` },
    data: { ...currentCard, cardComments: comment },
  }).then((response) => {
    console.log(response);
    dispatch({ type: UPDATE_CARD, payload: response.data });
  });
};
