import '../css/Board.css'
import React, {  useState } from 'react'
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Board = ({boardId}) => {
  const [boardData, setBoardData] = useState(null)
  const navigate = useNavigate()

  const fetchBoard = () => {
    const url = `/boards/${boardId}`
    const token = localStorage.token
    axios.get(url, { headers:  {'Authorization': `Bearer ${token}`}}).then((res) => {
      setBoardData(res.data)
    }).catch((err) => console.log("ERROR", err))
  }

  const handleNavigateToBoard = () => {
    navigate(`/b/${boardId}`)
  }
    const renderBoard = function () {
      if(boardData){
        return  (
          <button className="card2 col-md-4 " onClick={handleNavigateToBoard}>
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
        return (
        <a className="card2 col-md-4 " href='#'>
          <h3>Loading...</h3>
          <p className="small"></p>
          <div className="go-corner" href="#">
            <div className="go-arrow">
              →
            </div>
        </div>
      </a>
      )
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
