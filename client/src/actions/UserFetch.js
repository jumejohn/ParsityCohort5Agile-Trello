import axios from "axios";

export const FETCH_USER = "FETCH_USER"
export const fetchUser =(token) => dispatch =>{
    const url = `http://localhost:8000/auth/current_user`

    axios
        .get(url, { headers:  {'Authorization': `Bearer ${token}`}})
        .then(function (response) {
            console.log("fetchuseraction", response.data);
            dispatch({
                type: FETCH_USER,
                payload: response.data,
            })
        })
        };