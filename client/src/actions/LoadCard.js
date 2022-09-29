import axios from "axios";

export const LOAD_CARD = "LOAD_CARD";

export const loadCard = (cardID) => (dispatch) => {
  const token = localStorage.token;
  axios
    .get(`/cards/${cardID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (response) {
      dispatch({ type: LOAD_CARD, payload: response.data });
    });
};
