import axios from "axios";
import { axiosAuth } from "../utils/axiosAuth";

export const editLabels = (boardId, newLabels) => (dispatch) => {
  const token = localStorage.token;
  axiosAuth({
    method: "put",
    url: `/boards/${boardId}`,
    headers: {'Authorization': `Bearer ${token}`},
    data: {
      labels: newLabels,
    }
  })
    .then((response) => {
      console.log(response);
      dispatch({type: "UPDATE_BOARD", payload: response.data})
    }
    )
}
