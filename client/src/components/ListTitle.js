import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { editListTitle } from "../actions/EditListTitle";

const ListTitle = (props) => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const [titleIsEditing, setTitleIsEditing] = useState(false);
  const toggleTitleIsEditing = () => {
    setTitleIsEditing(!titleIsEditing);
  }

  const editSubmit = (data, event) => {
    // do not dispatch if edit field hasn't changed or is empty
    if (data.titleEditField == props.name || !data.titleEditField) {
      toggleTitleIsEditing();
      return;
    }
    dispatch(editListTitle(data.titleEditField, props.listId, props.listCards));
    toggleTitleIsEditing();
  }

  if (titleIsEditing) {
    return (
      <form onSubmit={handleSubmit(editSubmit)}>
        <input 
          className="form-control"
          defaultValue={props.name}
          {...register("titleEditField")}
        />
      </form>
    )
  }

  // by default
  return (
    <button onClick={toggleTitleIsEditing} className="btn btn-dark" style={{"backgroundColor": "transparent"}}>{props.name}</button>
  )
}

export default ListTitle;

ListTitle.propTypes = {
  name: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  listCards: PropTypes.array,
}
