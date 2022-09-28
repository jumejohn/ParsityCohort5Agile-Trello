import '../css/Board.css'
import React from 'react'
import PropTypes from "prop-types";

const Board = ({boardname, numBoards}) => {
  return (

      <button className="card2 col-md-4 " href="#">
        <h3>{boardname}</h3>
        <p className="small">Lists In Board: {numBoards}</p>    
        <div className="go-corner" href="#">
          <div className="go-arrow">
            →
          </div>
        </div>
      </button>

  
)
};

Board.propTypes = {
  boardname: PropTypes.string,
  numBoards: PropTypes.number,
}

export default Board;
