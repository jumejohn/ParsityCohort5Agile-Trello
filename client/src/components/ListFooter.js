import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { createCard } from "../actions/CreateCard";

const ListFooter = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const [tempCardIsOpen, setTempCardIsOpen] = useState(false);
  const toggleTempCardIsOpen = () => {
    setTempCardIsOpen(!tempCardIsOpen);
  }

  const handleClick = () => {
    reset();
    toggleTempCardIsOpen();
  }

  const onSubmit = (data) => {
    if (!data.cardTitle) {
      toggleTempCardIsOpen();
      reset();
      return;
    }
    dispatch(createCard(data.cardTitle, props.listId));
    toggleTempCardIsOpen();
  }

  if (tempCardIsOpen) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <textarea 
            className="form-control" 
            placeholder="Enter a title for this card..."
            {...register("cardTitle")}
          />
        </div>
        <div className="d-flex align-items-center">
          <button className="btn btn-light" type="submit">Add card</button>
          <button onClick={handleClick} className="btn-close btn-close-white ms-auto" type="button" aria-label="Close" /> 
        </div>
      </form>
    )
  }

  // by default
  return (
    <button className="btn btn-secondary" type="button" onClick={handleClick}>
            Add a card
    </button>
  )
}

export default ListFooter;

ListFooter.propTypes = {
  listId: PropTypes.string.isRequired,
}
