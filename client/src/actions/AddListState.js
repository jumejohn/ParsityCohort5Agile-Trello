export const ADD_LIST_STATE = "ADD_LIST_STATE";
export const addListState = (dispatch) => {
  const tempList = {
    _id: "tempList",
    listName: "",
    cards: [],
  }
  dispatch({
    type: ADD_LIST_STATE,
    payload: tempList,
  })
}
