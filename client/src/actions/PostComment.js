import axios from "axios";
export const UPDATE_CARD = "UPDATE_CARD";

export const postComment = (comment, currentCard) => (dispatch) => {
  console.log("action currentCard", currentCard);
  const token = localStorage.token;
  const cardId = currentCard._id;

  axios({
    method: "put",
    url: `/cards/${cardId}`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      cardComments: comment,
    },
  }).then((response) => {
    console.log("this response", response);
    dispatch({ type: UPDATE_CARD, payload: response.data });
  });
};
