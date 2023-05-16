import axios from "axios";
import {axiosAuth} from "../utils/axiosAuth"

export const CREATE_CARD = "CREATE_CARD";
export const createCard = (cardTitle, listId) => (dispatch) => {
  const token = localStorage.token;
  axiosAuth({
    method: "post",
    url: "/cards/",
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
