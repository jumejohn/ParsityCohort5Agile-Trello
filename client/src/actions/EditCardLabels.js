import axios from "axios";
import { axiosAuth } from "../utils/axiosAuth";

export const EDIT_CARD_LABELS = "EDIT_CARD_LABELS";
export const editCardLabels = (listId, cardId, newLabels) => (dispatch) => {
  const token = localStorage.token;
  axiosAuth({
    method: "put",
    url: `/cards/${cardId}`,
    headers: { Authorization: `Bearer ${token}` },
    data: {
      listId: listId,
      cardLabel: newLabels,
    }
  }).then(response => {
    console.log(response);
    dispatch({ type: EDIT_CARD_LABELS, payload: response.data.card });
    dispatch({ type: "UPDATE_LIST", payload: response.data.list });
  })
};
