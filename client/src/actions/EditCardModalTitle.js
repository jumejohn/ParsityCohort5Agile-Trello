import axios from "axios";
import { UPDATE_CARD } from "./PostComment";
import { axiosAuth } from "../utils/axiosAuth";

export const editCardModalTitle = (newTitle, currentUser) => (dispatch) => {
  const token = localStorage.token;
  const cardId = localStorage.card;
  // console.log("action", newTitle);
  axiosAuth({
    method: "put",
    url: `/cards/${cardId}/updatetitle`,
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
