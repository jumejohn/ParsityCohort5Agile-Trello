import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Card from "./Card";
import { deleteCard } from "../actions/DeleteCard";
import CardQuickEditModal from "./CardQuickEditModal";

const CardOnList = (props) => {
  const dispatch = useDispatch();

  // Utilizing useRef hook to get position of card element
  const ref = useRef();
  const currentRef = ref.current;
  // const x = myRef.current.offsetLeft;
  // const y = myRef.current.offsetTop;

  const [buttonsAreShown, setButtonsAreShown] = useState(false);

  const handleDeleteClick = () => {
    dispatch(deleteCard(props.cardId, props.listId));
  };

  // Modal stuff for quick edits
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const handleEditClick = () => {
    let parentBCR = returnParentBCR();
    setEditModalIsOpen(true);
  };
  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setButtonsAreShown(false);
  };

  const returnParentBCR = () => {
    let { left, top, width } = currentRef.getBoundingClientRect();

    return {
      left: left,
      top: top,
      width: width,
    };
  };

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
      className="d-flex align-items-start"
      style={{ backgroundColor: "white" }}
      onMouseEnter={() => setButtonsAreShown(true)}
      onMouseLeave={() => setButtonsAreShown(false)}
      ref={ref}
    >
      <button
        value={props.cardId}
        onClick={handleCardClick}
        className="list-group-item list-group-item-action"
      >
        {props.cardTitle}
      </button>
      {buttonsAreShown && (
        <div className="btn-group">
          <button
            className="btn"
            style={{ padding: "0.15rem 0.3rem" }}
            onClick={handleEditClick}
            type="button"
            aria-label="Edit Card Title"
          >
            <i className="fa fa-pencil fa-2x" />
          </button>
          <button
            className="btn"
            style={{ padding: "0.15rem 0.3rem" }}
            onClick={handleDeleteClick}
            type="button"
            aria-label="Delete Card"
          >
            <i className="fa fa-times-circle-o fa-2x" />
          </button>
        </div>
      )}
      {editModalIsOpen && (
        <CardQuickEditModal
          isOpen={editModalIsOpen}
          cardId={props.cardId}
          listId={props.listId}
          cardTitle={props.cardTitle}
          cardLabel={props.cardLabel}
          cardDescription={props.cardDescription}
          closeModal={closeEditModal}
          getBCR={returnParentBCR}
        />
      )}
      <div>
        <Modal isOpen={modalIsOpen} style={{ marginTop: "60px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <button onClick={handleCloseModalClick}>x</button>
          </div>
          <Card />
        </Modal>
      </div>
    </div>
  );
};

export default CardOnList;

CardOnList.propTypes = {
  cardId: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  cardLabel: PropTypes.string,
  cardDescription: PropTypes.string,
  listId: PropTypes.string.isRequired,
};
