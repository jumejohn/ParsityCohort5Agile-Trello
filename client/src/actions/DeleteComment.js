import axios from "axios";
export const UPDATE_CARD = "UPDATE_CARD";

export const deleteComment = (comment, cardId) => (dispatch) => {
  const token = localStorage.token;

  axios({
    method: "delete",
    url: `https://parsitycohort5agile-trello-production.up.railway.app/cards/${cardId}/comment/${comment}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then((response) => {
    console.log("delete comment", response);
    dispatch({ type: UPDATE_CARD, payload: response.data });
  });
};
