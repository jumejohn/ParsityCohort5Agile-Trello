import axios from "axios";

export const FETCH_USER = "FETCH_USER"
export const fetchUser =(userID) => dispatch =>{
    const url = `http://localhost:8000/user/${userID}`
    axios
        .get(url)
        .then(function (response) {
            console.log("fetchuseraction", response.data);
            dispatch({
                type: FETCH_USER,
                payload: response.data,
            })
        })
        };