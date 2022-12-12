import axios from "axios";

export const DELETE_LIST = "DELETE_LIST";
export const deleteList = (listId) => (dispatch) => {
  const token = localStorage.token;
  axios({
    method: "delete",
    url: `https://parsitycohort5agile-trello-production.up.railway.app/lists/${listId}`,
    headers: {'Authorization': `Bearer ${token}`},
  })
    .then(() => dispatch({ type: DELETE_LIST, payload: listId }))
}
