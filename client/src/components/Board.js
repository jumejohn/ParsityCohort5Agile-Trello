import '../css/Board.css'
import React, {  useState } from 'react'
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Board = ({boardId, boardName, numLists}) => {
  const navigate = useNavigate()

  const handleNavigateToBoard = () => {
    navigate(`/b/${boardId}`)
  }
    const renderBoard = function () {
        return  (
          <button className="card2 col-md-4 " onClick={handleNavigateToBoard}>
            <h3>{boardName}</h3>
            <p className="small">Lists In Board: {numLists}</p>
            <div className="go-corner" href="#">
              <div className="go-arrow">
                →
              </div>
          </div>
          </button>
      )
    }
    return renderBoard()
}







Board.propTypes = {
  boardname: PropTypes.string,
  numLists: PropTypes.number,
  boardId: PropTypes.string
}

export default Board;
