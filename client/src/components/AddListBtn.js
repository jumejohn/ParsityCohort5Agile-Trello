import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addListState } from "../actions/AddListState";

const AddListBtn = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.rootReducer.currentBoard.lists);
  if (lists.length > 0) {
    if (lists[lists.length - 1]._id === "tempList") {
      return <></>;
    }
  }

  const handleClick = () => {
    dispatch(addListState);
  };

  return (
    <div className="col-3">
      <div className="card bg-black">
        <div className="card-footer d-grid">
          <button
            className="btn btn-secondary"
            onClick={handleClick}
            type="button"
          >
            Add a list
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddListBtn;
