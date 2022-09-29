import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const HeaderDropDown = (props) => {
  const isViewingBoard = useSelector(state => state.rootReducer.currentBoard.boardName);
  const boards = useSelector(state => state.rootReducer.user.currentUser.organization.orgBoards);

  if (isViewingBoard) {
    let splitUrlArr = window.location.href.split("/");
    let currentBoardId = splitUrlArr[splitUrlArr.length-1];

    return (
      <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">{props.name}&apos;s Boards</button>
        <ul className="dropdown-menu">
          {boards.map((board, i) => {
            let boardLink = `/b/${board._id}`;
            let itemClass = "dropdown-item";
            (board._id == currentBoardId) ? itemClass = `${itemClass} disabled`: false; 
            return (
              <li key={i}>
                <a className={itemClass} href={boardLink}>{board.boardName}</a>
              </li>
            )})}
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="/">Back to Workspace</a></li>
        </ul>
      </div>
    )
  }

  return (
    <div>{props.name}&apos;s Boards</div>
  )
}

export default HeaderDropDown;

HeaderDropDown.propTypes = {
  name: PropTypes.string,
}
