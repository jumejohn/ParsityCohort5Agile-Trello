import axios from "axios";
import { LOAD_CARD } from "./types";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

export const loadCard = (cardID) => (dispatch) => {
  axios
    .get(`http://localhost:8000/card/{$cardID}`, config)
    .then(function (response) {
      dispatch({ type: LOAD_CARD, payload: response.data });
      console.log(response.data);
    });
};
