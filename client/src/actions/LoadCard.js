import axios from "axios";
export const LOAD_CARD = "LOAD_CARD";

export const loadCard = (username) => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  axios.get(`http://localhost:8000/cards`, config).then(function (response) {
    dispatch({ type: LOAD_CARD, payload: response.data });
  });
};
