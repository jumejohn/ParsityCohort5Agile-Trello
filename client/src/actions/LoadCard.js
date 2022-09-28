import axios from "axios";
import { LOAD_CARD } from "./types";

export const loadCard = () => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  axios.get(`http://localhost:8000/cards`, config).then(function (response) {
    dispatch({ type: LOAD_CARD, payload: response.data });
    console.log(response.data);
  });
};
