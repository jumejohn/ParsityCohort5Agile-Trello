
export const HANDLE_LOGOUT = "HANDLE_LOGOUT"

export const handleLogout = (callback) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({type: HANDLE_LOGOUT}) 
  callback()
}