import axios from "axios";
import { HANDLE_LOGIN } from "./types";
export const handleLogin = (userData) => (dispatch) => {
  const url = `http://localhost:8000/auth/signin`;
  const user = {
    userData,
  };

  axios
    .post(url, user)
    .then(function (response) {
      dispatch({
        type: HANDLE_LOGIN,
        payload: response.data,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
