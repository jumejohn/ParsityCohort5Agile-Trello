import axios from "axios";
export const UPDATE_CARD = "UPDATE_CARD";

export const postComment = (comment, currentCard) => (dispatch) => {
  console.log("action currentCard", currentCard);
  const token = localStorage.token;
  const cardId = currentCard._id;

  axios({
    method: "post",
    url: `/cards/${cardId}/comment`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      cardComments: comment,
    },
  }).then((response) => {
    console.log("this response", response);
    dispatch({ type: UPDATE_CARD, payload: response.data });
  });
};
