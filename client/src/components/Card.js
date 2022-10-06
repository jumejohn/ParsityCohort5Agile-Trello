import React from "react";
import { loadCard } from "../actions/LoadCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { postComment } from "../actions/PostComment";
import CommentsDiplay from "./CardCommentDisplay";
import CardModalTitle from "./CardModalTitle";
import CardActivity from "./CardActivity";
import "../css/Card.css";
import CardModalDescription from "./CardModalDescription";
import LabelModal from "./modals/LabelModal";
import { editCardLabels } from "../actions/EditCardLabels";

const Card = (props) => {
  const dispatch = useDispatch();
  const thisCard = localStorage.card;
  useEffect(() => {
    //load the card that is clicked
    dispatch(loadCard(thisCard));
  }, []);
  const { reset, register, handleSubmit } = useForm();
  const currentCard =
    useSelector((state) => state.rootReducer.currentCard) || null;
  const currentUser = useSelector(
    (state) => state.rootReducer.user.currentUser.username || null
  );
  const currentBoardLabels = useSelector(state => state.rootReducer.currentBoard.labels);
  const onSubmit = (data) => {
    dispatch(postComment(data, currentCard));
    reset();
  };
  const [isShow, setIsShow] = React.useState(false);

  const handleClick = () => {
    setIsShow(!isShow);
  };

  // For label modal
  const [labelModalIsOpen, setLabelModalIsOpen] = useState(false);
  const toggleLabelModalIsOpen = () => {
    setLabelModalIsOpen(!labelModalIsOpen);
  }
  const handleLabelChange = (labelIndex) => {
    let newArray = [...currentCard.cardLabel];
    let toggledLabel = currentBoardLabels[labelIndex];
    let alreadyChecked = newArray.findIndex((label) => label.color === toggledLabel.color);
    (alreadyChecked > -1) ? newArray.splice(alreadyChecked, 1) : newArray.push(toggledLabel);
    dispatch(editCardLabels(props.listId, currentCard._id, newArray));
  }

  if (Object.keys(currentCard).length > 0) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title-modal">
            <CardModalTitle />
          </h5>
          <div
            className="row"
            style={{ width: "100%", backgroundColor: "white", margin: "0" }}
          >
            <div>Labels:</div>
            {currentCard.cardLabel.length > 0 &&
              currentCard.cardLabel.map((label, index) => (
                <button
                  className="col-3 btn label-button"
                  style={{ backgroundColor: label.color }}
                  key={index}
                />
              ))}
              <button 
                className="col-1 btn btn-secondary label-button"
                onClick={toggleLabelModalIsOpen}
              >
                <i className="fa fa-plus fa-1.5" />
              </button>
              {labelModalIsOpen && (
                <LabelModal 
                  isOpen={labelModalIsOpen}
                  onClose={toggleLabelModalIsOpen}
                  onChange={handleLabelChange}
                  // toggleChange={() => console.log("ToggleChange")}
                  cardLabels={currentCard.cardLabel}
                  openLabelEditor={() => console.log("openLabelEditor")}
                />
              )}
          </div>
          <div className="card-text description">
            <CardModalDescription />
          </div>
        </div>
        <>
          <div>
            {isShow ? (
              <button
                id="activityShow"
                className="submit-button activity-button"
                onClick={handleClick}
              >
                Hide Activity
              </button>
            ) : (
              <button
                id="activityShow"
                className="submit-button activity-button"
                onClick={handleClick}
              >
                Show Activity
              </button>
            )}
          </div>
          <div className="container comment-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="form-label comment-title">User:</label>
              <input
                type="text"
                readOnly
                className="form-control-plaintext comment-title"
                value={currentUser}
                {...register("commentUser")}
              />
              <div className="mb-3">
                <label className="form-label comment-title">Comment:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  {...register("commentText")}
                ></textarea>
              </div>
              <div className="input-group mb-3">
                <button type="submit" className="btn submit-button">
                  Submit Comment
                </button>
              </div>
            </form>
          </div>
          <table className="comment-table">
            <CommentsDiplay />
          </table>
          <div className="activity-log">
            {isShow ? (
              <CardActivity>show/hide CardActivity</CardActivity>
            ) : (
              <></>
            )}
          </div>
        </>
      </div>
    );
  } else {
    <></>;
  }
};

export default Card;

Card.propTypes = {
  listId: PropTypes.string,
}
