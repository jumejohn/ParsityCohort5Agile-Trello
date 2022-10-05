import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import ClickDetectWrapper from "./ClickDetectWrapper";

const CardModalTitle = (props) => {
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

  const editSubmit = (data, event) => {
    if (data.titleEditField == props.name || !data.titleEditField) {
      toggleTitleIsEditing();
      return;
    }
    dispatch(
      editCardModalTitle(data.titleEditField, props.cardId, currentUser)
    );
    toggleTitleIsEditing();

    if (titleIsEditing) {
      return (
        <ClickDetectWrapper callback={toggleTitleIsEditing}>
          <form onSubmit={handleSubmit(editSubmit)}>
            <input
              className="form-control"
              defaultValue={props.name}
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
      {props.name}
    </button>
  );
};

export default CardModalTitle;

CardModalTitle.propTypes = {
  name: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
};
