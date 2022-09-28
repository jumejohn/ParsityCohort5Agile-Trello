import axios from "axios";
import { LOAD_CARD } from "./types";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};
export const loadCard = () => (dispatch) => {

  axios.get(`http://localhost:8000/card`, config).then(function (response) {
    dispatch({ type: LOAD_CARD, payload: response.data });
    console.log(response.data);
  });
};
