import axios from "axios";

export const editListTitle = (newTitle, currentUser) => (dispatch) => {
  const token = localStorage.token;
  const cardId = localStorage.card;
  axios({
    method: "put",
    url: `/cards/${cardId}/updatetitle`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      cardTitle: newTitle,
      username: currentUser,
    },
  }).then((response) => {
    console.log(response);
    dispatch({ type: "UPDATE_LIST", payload: response.data });
  });
};
