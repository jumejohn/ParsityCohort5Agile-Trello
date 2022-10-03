import axios from "axios";
export const CREATE_COMMENT = "CREATE_COMMENT";

export const postComment = (comment, currentCard) => (dispatch) => {
  console.log("action currentCard", currentCard);
  const token = localStorage.token;
  const comments = currentCard.cardComments;
  console.log("postcommentscurrentCard", comments);
  comments.push(comment);
  console.log("after push comment", comments);
  const cardId = currentCard._id;
  axios({
    method: "put",
    url: `/cards/${cardId}`,
    headers: { Authorization: `Bearer ${token}` },
    data: { cardComments: comment },
  }).then((response) => {
    console.log("this response", response);
    dispatch({ type: CREATE_COMMENT, payload: response.data });
  });
};
