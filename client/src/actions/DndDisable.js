export const DELETE_LIST = "DELETE_LIST";
export const disableDnd = () => (dispatch) => {
dispatch({ type: "HANDLE_ENABLE"})
}

export const enableDnd = () => (dispatch) => {
  dispatch({ type: "HANDLE_ENABLE"})
}
