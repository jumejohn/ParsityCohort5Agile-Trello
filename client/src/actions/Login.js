import axios from "axios";
import { HANDLE_LOGIN } from "./types";
export const handleLogin = (userData, callback) => (dispatch) => {
  const url = `http://localhost:8000/auth/signin`;
  console.log(userData)
  axios
    .post(url, userData)
    .then(function (response) {
      dispatch({
        type: HANDLE_LOGIN,
        payload: response.data,
      });
      //shows the data returned in the payload for dev purposes
      console.log("login action", response.data);
      //sets token into local storage upon successful login
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('userID', response.data.userID)
      callback();
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });

};
