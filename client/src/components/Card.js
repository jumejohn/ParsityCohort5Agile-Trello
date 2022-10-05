import React from "react";
import { loadCard } from "../actions/LoadCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { postComment } from "../actions/PostComment";
import CommentsDiplay from "./CardCommentDisplay";
import CardModalTitle from "./CardModalTitle";
import CardActivity from "./CardActivity";
import "../css/Card.css";

const Card = () => {
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
  const onSubmit = (data) => {
    dispatch(postComment(data, currentCard));
    reset();
  };
  const [isShow, setIsShow] = React.useState(false);

  const handleClick = () => {
    setIsShow(!isShow);
  };

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
                  className="col-3 btn"
                  style={{ backgroundColor: label.color }}
                  key={index}
                />
              ))}
          </div>
          <p className="card-text">{currentCard.cardDescription}</p>
        </div>
        <>
          <div>
            {isShow ? (
              <button id="activityShow" onClick={handleClick}>
                Hide Activity
              </button>
            ) : (
              <button id="activityShow" onClick={handleClick}>
                Show Activity
              </button>
            )}
          </div>
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="form-label">User:</label>
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                value={currentUser}
                {...register("commentUser")}
              />
              <div className="mb-3">
                <label className="form-label">Comment:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  {...register("commentText")}
                ></textarea>
              </div>
              <div className="input-group mb-3">
                <button type="submit" className="btn comment-submit-button">
                  Submit Comment
                </button>
              </div>
            </form>
          </div>
          <table className="comment-table">
            <CommentsDiplay />
          </table>
          <div>
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
