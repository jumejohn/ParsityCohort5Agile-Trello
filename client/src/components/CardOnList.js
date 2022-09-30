import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Card from "./Card";
import { deleteCard } from "../actions/DeleteCard";

const CardOnList = (props) => {
  const dispatch = useDispatch();
  // On Hover to make accessory buttons show
  const [buttonsAreShown, setButtonsAreShown] = useState(false); 

  const handleDeleteClick = () => {
    dispatch(deleteCard(props.cardId, props.listId));
  }

  // Modal stuff
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleCardClick = (e) => {
    setButtonsAreShown(false);
    setModalIsOpen(true);
    localStorage.setItem("card", e.target.value);
  };
  const handleCloseModalClick = () => {
    setModalIsOpen(false);
  };

  return (
    <div
      className="d-flex align-items-center"
      style={{ "backgroundColor": "white" }}
      onMouseEnter={() => setButtonsAreShown(true)}
      onMouseLeave={() => setButtonsAreShown(false)}
    >
      <button
        value={props.cardId}
        onClick={handleCardClick}
        className="list-group-item list-group-item-action"
      >
        {props.cardTitle}
      </button>
      {buttonsAreShown && (
        <button className="btn-close col-1" onClick={handleDeleteClick} type="button" aria-label="Delete Card" />
      )}
      <Modal isOpen={modalIsOpen}>
        <button onClick={handleCloseModalClick}>x</button>
        <Card />
      </Modal>
    </div>
  );
}

export default CardOnList;

CardOnList.propTypes = {
  cardId: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
}
