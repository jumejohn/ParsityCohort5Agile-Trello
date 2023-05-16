import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosAuth } from "../utils/axiosAuth";
export const FETCH_USER = "FETCH_USER";
export const fetchUser = (token) => async (dispatch) => {
  const url = `/auth/current_user`;

  axiosAuth
    .get(url)
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
