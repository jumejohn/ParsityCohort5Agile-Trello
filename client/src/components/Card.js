import React from "react";
import { loadCard } from "../actions/LoadCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Card = () => {
  const dispatch = useDispatch();
  const thisCard = localStorage.card;
  useEffect(() => {
    dispatch(loadCard(thisCard));
  }, []);
  const { reset, register, handleSubmit } = useForm();
  const currentCard = useSelector(
    (state) => state.rootReducer.currentCard || null
  );
  const currentUser = useSelector(
    (state) => state.rootReducer.user.currentUser.username || null
  );
  console.log("card-user", currentUser);
  console.log("currentCard", currentCard);
  const onSubmit = (data) => {
    postComment(data);
    reset({ comment: "" });
  };

  if (currentCard) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{currentCard.cardTitle}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {currentCard.cardLabel}
          </h6>
          <p className="card-text">{currentCard.cardDescription}</p>
        </div>
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="currentUser" className="form-label">
              User:
            </label>
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              id="currentUser"
              value={currentUser}
              {...register("User")}
            />
            <div className="mb-3">
              <label htmlFor="commentTextArea" className="form-label">
                Comment
              </label>
              <textarea
                className="form-control"
                id="commentTextArea"
                rows="3"
                {...register("comment")}
              ></textarea>
            </div>
            <div className="input-group mb-3">
              <button type="submit" className="btn btn-primary">
                Submit Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    <></>;
  }
};

export default Card;
