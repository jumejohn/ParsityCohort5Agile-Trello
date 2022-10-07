import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import ClickDetectWrapper from "./ClickDetectWrapper";
import { editListTitle } from "../actions/EditListTitle";
import "../css/List.css";

const ListTitle = (props) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const [titleIsEditing, setTitleIsEditing] = useState(false);
  const toggleTitleIsEditing = () => {
    setTitleIsEditing(!titleIsEditing);
    reset();
  };

  const editSubmit = (data, event) => {
    // do not dispatch if edit field hasn't changed or is empty
    if (data.titleEditField == props.name || !data.titleEditField) {
      toggleTitleIsEditing();
      return;
    }
    dispatch(editListTitle(data.titleEditField, props.listId, props.listCards));
    toggleTitleIsEditing();
  };

  if (titleIsEditing) {
    return (
      <ClickDetectWrapper callback={toggleTitleIsEditing}>
        <form onSubmit={handleSubmit(editSubmit)}>
          <input
            className="form-control text-input"
            defaultValue={props.name}
            {...register("titleEditField")}
          />
        </form>
      </ClickDetectWrapper>
    );
  }

  // by default
  return (
    <button
      onClick={toggleTitleIsEditing}
      className="btn list-title"
      style={{ backgroundColor: "transparent" }}
    >
      {props.name}
    </button>
  );
};

export default ListTitle;

ListTitle.propTypes = {
  name: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  listCards: PropTypes.array,
};
