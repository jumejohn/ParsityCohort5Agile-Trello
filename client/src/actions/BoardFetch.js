import axios from "axios";

export const FETCH_BOARD = "FETCH_BOARD";
export const fetchBoard =(boardId) => dispatch =>{
    const url = `http://localhost:8000/boards/${boardId}`

    axios
        .get(url)
        .then(function (response) {
            // console.log("Fetch Board Data:", response.data);
            dispatch({
                type: FETCH_BOARD,
                payload: response.data,
            })
          })
        .catch((error) => {
          console.log(error)
          let errProm = Promise.reject();
          console.log("errProm", errProm);
          return errProm;
        })
        return Promise.reject()
        };
