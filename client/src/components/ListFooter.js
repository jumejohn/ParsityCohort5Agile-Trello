import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { createCard } from "../actions/CreateCard";
import ClickDetectWrapper from "./ClickDetectWrapper";

const ListFooter = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const [tempCardIsOpen, setTempCardIsOpen] = useState(false);
  const toggleTempCardIsOpen = () => {
    setTempCardIsOpen(!tempCardIsOpen);
    reset();
  };

  const onSubmit = (data) => {
    if (!data.cardTitle) {
      toggleTempCardIsOpen();
      return;
    }
    dispatch(createCard(data.cardTitle, props.listId));
    toggleTempCardIsOpen();
  };

  if (tempCardIsOpen) {
    return (
      <ClickDetectWrapper callback={toggleTempCardIsOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <textarea
              className="form-control"
              placeholder="Enter a title for this card..."
              {...register("cardTitle")}
            />
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-light" type="submit">
              Add card
            </button>
            <button
              onClick={toggleTempCardIsOpen}
              className="btn-close btn-close-white ms-auto"
              type="button"
              aria-label="Close"
            />
          </div>
        </form>
      </ClickDetectWrapper>
    );
  }

  // by default
  return (
    <button className="btn " type="button" onClick={toggleTempCardIsOpen}>
      <i className="fa fa-plus fa-1.5" />
      <span> </span>Add a card
    </button>
  );
};

export default ListFooter;

ListFooter.propTypes = {
  listId: PropTypes.string.isRequired,
};
