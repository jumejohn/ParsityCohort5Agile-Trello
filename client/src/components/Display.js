import { useSelector } from "react-redux";

import Board from './Board'
import '../css/Display.css'
import React from 'react'

const Display = () => {
  const boardsData = useSelector(state => {
    if(state.rootReducer.user.currentUser){
      return state.rootReducer.user.currentUser.organization.orgBoards
    }
  });

  const renderBoards = () => {
    const boardsArray = boardsData.map((board, i) => {
      return (
        <Board
          key={i}
          boardId={board._id}
        ></Board>
      );
    });

    return boardsArray;
  };
  if(boardsData){
  return (
    <section className="container">
      <section className="row row-cols-3 boards__section gy-5 justify-content-center">
        {renderBoards()}
        <button className="btn btn-primary   ">Add New Board</button>
      </section>
    </section>
  )}
  else {
    <div>LOADING</div>
  }
};

export default Display;
