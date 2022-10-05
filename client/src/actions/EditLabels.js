import axios from "axios";

export const editLabels = (boardId, newLabels) => (dispatch) => {
  const token = localStorage.token;
  axios({
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
