import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ClickDetectWrapper from "./ClickDetectWrapper";

const CardModalTitle = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const [titleIsEditing, setTitleIsEditing] = useState(false);
  const toggleTitleIsEditing = () => {
    setTitleIsEditing(!titleIsEditing);
    reset();
  };
  const currentUser = useSelector(
    (state) => state.rootReducer.user.currentUser.username || null
  );
  const currentCard =
    useSelector((state) => state.rootReducer.currentCard) || null;

  const editSubmit = (data, event) => {
    if (data.titleEditField == currentCard.cardTitle || !data.titleEditField) {
      toggleTitleIsEditing();
      return;
    }
    dispatch(
      editCardModalTitle(data.titleEditField, currentCard._id, currentUser)
    );
    toggleTitleIsEditing();

    if (titleIsEditing) {
      return (
        <ClickDetectWrapper callback={toggleTitleIsEditing}>
          <form onSubmit={handleSubmit(editSubmit)}>
            <input
              className="form-control"
              defaultValue={currentCard.cardTitle}
              {...register("titleEditField")}
            />
          </form>
        </ClickDetectWrapper>
      );
    }
  };

  return (
    <button
      onClick={toggleTitleIsEditing}
      className="btn btn-outline-light"
      style={{ backgroudColor: "transparent" }}
    >
      {currentCard.cardTitle}
    </button>
  );
};

export default CardModalTitle;
