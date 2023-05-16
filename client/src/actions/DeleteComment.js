import axios from "axios";
import { axiosAuth } from "../utils/axiosAuth";
export const UPDATE_CARD = "UPDATE_CARD";

export const deleteComment = (comment, cardId) => (dispatch) => {
  const token = localStorage.token;

  axiosAuth({
    method: "delete",
    url: `/cards/${cardId}/comment/${comment}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then((response) => {
    console.log("delete comment", response);
    dispatch({ type: UPDATE_CARD, payload: response.data });
  });
};
