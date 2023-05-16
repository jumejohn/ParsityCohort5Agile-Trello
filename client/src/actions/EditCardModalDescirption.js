import axios from "axios";
import { UPDATE_CARD } from "./PostComment";
import { axiosAuth } from "../utils/axiosAuth";

export const editCardModalDescription =
  (newDescription, currentUser) => (dispatch) => {
    const token = localStorage.token;
    const cardId = localStorage.card;
    console.log("action", newDescription);
    axiosAuth({
      method: "put",
      url: `/cards/${cardId}/updatedescription`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        cardDescription: newDescription.cardDescription,
        username: currentUser,
      },
    }).then((response) => {
      console.log(response);
      dispatch({ type: UPDATE_CARD, payload: response.data });
    });
  };
