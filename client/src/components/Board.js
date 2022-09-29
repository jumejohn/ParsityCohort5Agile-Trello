import '../css/Board.css'
import React, {  useState } from 'react'
import PropTypes from "prop-types";
import axios from "axios";


const Board = ({boardId}) => {
  const [boardData, setBoardData] = useState(null)
  
  const fetchBoard = () => {
    const url = `http://localhost:8000/boards/${boardId}`

    axios.get(url).then((res) => {
      setBoardData(res.data)
    }).catch((err) => console.log("ERROR", err))
  }

    const renderBoard = function () {
      if(boardData){
        return  (
          <button className="card2 col-md-4 " href="#">
            <h3>{boardData.boardName}</h3>
            <p className="small">Lists In Board: {boardData.lists.length}</p>    
            <div className="go-corner" href="#">
              <div className="go-arrow">
                →
              </div>
          </div>
          </button>
      )
      }
      else{
        fetchBoard()
        return <div>Loading...</div>
      }
      }
      return renderBoard()
}
  






Board.propTypes = {
  boardname: PropTypes.string,
  numBoards: PropTypes.number,
  boardId: PropTypes.string
}

export default Board;
