import axios from "axios";
import { axiosAuth } from "../utils/axiosAuth";

export const quickEditCard =
  (cardId, listId, newCardTitle, cardLabel, cardDescription, cardComments) =>
  (dispatch) => {
    const token = localStorage.token;
    axiosAuth({
      method: "put",
      url: `/cards/${cardId}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        listId: listId,
        cardTitle: newCardTitle,
        cardLabel: cardLabel,
        cardDescription: cardDescription,
        cardComments: cardComments,
      },
    }).then((response) => {
      // console.log(response);
      dispatch({ type: "UPDATE_LIST", payload: response.data });
    });
  };
