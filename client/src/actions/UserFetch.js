import axios from "axios";
import { useNavigate } from "react-router-dom";
export const FETCH_USER = "FETCH_USER";
export const fetchUser = (token) => async (dispatch) => {
  const url = `/auth/current_user`;

  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(function (response) {
      console.log("fetchuseraction", response.data);
      dispatch({
        type: FETCH_USER,
        payload: response.data,
      });
    })
    .catch((error) => {
      localStorage.clear();
      window.location.href = "/login";
    });
};
