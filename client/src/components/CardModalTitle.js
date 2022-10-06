import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { editCardModalTitle } from "../actions/EditCardModalTitle";

const CardModalTitle = () => {
  const [isShow, setIsShow] = React.useState(true);
  const currentCard = useSelector(
    (state) => state.rootReducer.currentCard || null
  );
  const currentUser = useSelector(
    (state) => state.rootReducer.user.currentUser.username
  );
  console.log(currentUser);
  console.log("cardModalTitle", currentCard);
  const dispatch = useDispatch();
  const { reset, register, handleSubmit } = useForm();

  const handleClick = () => {
    setIsShow(!isShow);
  };

  const onSubmit = (data) => {
    dispatch(editCardModalTitle(data, currentUser));
    reset();
    setIsShow(!isShow);
  };

  return (
    <>
      <div>
        {isShow ? (
          <button
            className="btn modal-title"
            id="activityShow"
            onClick={handleClick}
          >
            {currentCard.cardTitle}
          </button>
        ) : (
          <div>
            <div className="mb-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                  className="form-control"
                  rows="1"
                  {...register("cardTitle")}
                  defaultValue={currentCard.cardTitle}
                ></textarea>
                <button type="submit" className="btn submit-button">
                  Update Title
                </button>
                <span> </span>
                <span> </span>
                <button
                  onClick={handleClick}
                  className="btn-close submit-button  close-button"
                  type="button"
                  aria-label="Close"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CardModalTitle;
