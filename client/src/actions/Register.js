import axios from "axios";
import { HANDLE_REGISTER } from "./types";
import { axiosAuth } from "../utils/axiosAuth";
export const handleRegister = (userData, callback) => (dispatch) => {
  const url = `/auth/register`;

  axiosAuth
    .post(url, userData)
    .then(function (response) {
      dispatch({
        type: HANDLE_REGISTER,
        payload: response.data,
      }); 
      //shows the data returned in the payload for dev purposes
      // console.log("login action", response.data);
      //sets token into local storage upon successful login
      localStorage.setItem("token", response.data.user.token);
      localStorage.setItem("userID", response.data.user._id);
      callback();
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
};
