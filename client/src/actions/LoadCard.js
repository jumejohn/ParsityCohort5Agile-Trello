import axios from "axios";
import { axiosAuth } from "../utils/axiosAuth";

export const LOAD_CARD = "LOAD_CARD";

export const loadCard = (cardID) => (dispatch) => {
  const token = localStorage.token;
  axiosAuth
    .get(`/cards/${cardID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (response) {
      dispatch({ type: LOAD_CARD, payload: response.data });
    });
};
