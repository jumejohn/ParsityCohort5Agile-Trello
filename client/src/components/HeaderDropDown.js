import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate, redirect, Link } from "react-router-dom";
import "../css/Header.css";

const HeaderDropDown = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector(
    (state) => state.rootReducer.user.currentUser.organization.orgBoards
  );

  let splitUrlArr = window.location.href.split("/");
  let currentBoardId = splitUrlArr[splitUrlArr.length - 1];
  console.log(currentBoardId);
  const handleClick = () => {
    dispatch({ type: "RESET_CURRENT_BOARD" });
    navigate("/");
  };
  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
      >
        {props.name}&apos;s Boards
      </button>
      <ul className="dropdown-menu" style={{ zIndex: "1" }}>
        {boards.map((board, i) => {
          let boardLink = `/b/${board._id}`;
          let itemClass = "dropdown-item";
          board._id == currentBoardId
            ? (itemClass = `${itemClass} disabled`)
            : false;
          return (
            <li key={i}>
              <Link className={itemClass} to={boardLink}>{board.boardName}</Link>
            </li>
          );
        })}
        {currentBoardId && (
          <div>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" onClick={handleClick}>
                Back to Workspace
              </a>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default HeaderDropDown;

HeaderDropDown.propTypes = {
  name: PropTypes.string,
};
