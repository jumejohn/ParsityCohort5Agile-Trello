import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Card from "./Card";
import { deleteCard } from "../actions/DeleteCard";
import CardQuickEditModal from "./modals/CardQuickEditModal";
import AreYouSure from "./modals/AreYouSure";

const CardOnList = (props) => {
  const dispatch = useDispatch();

  // Utilizing useRef hook to get position of card element
  const ref = useRef();
  const currentRef = ref.current;
  // const x = myRef.current.offsetLeft;
  // const y = myRef.current.offsetTop;

  const [buttonsAreShown, setButtonsAreShown] = useState(false);

  // Modal stuff for deleting cards
  const [areYouSureIsOpen, setAreYouSureIsOpen] = useState(false);
  const toggleAreYouSureIsOpen = () => {
    setAreYouSureIsOpen(!areYouSureIsOpen);
    setButtonsAreShown(false);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteCard(props.cardId, props.listId));
    toggleAreYouSureIsOpen();
  };

  // Modal stuff for quick edits
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const handleEditClick = () => {
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
    dispatch({type: "HANDLE_DISABLE"})
    console.log("this should be cardId", e.target.value);
    localStorage.setItem("card", e.target.value);
  };
  const handleCloseModalClick = () => {
    setModalIsOpen(false);
    dispatch({type: "HANDLE_ENABLE"})
  };

  return (
    <div ref={ref}>
      <div
        className="row"
        style={{ width: "100%", backgroundColor: "white", margin: "0" }}
      >
        {props.cardLabel.length > 0 &&
          props.cardLabel.map((label, index) => (
            <button
              className="col-3 btn label-button"
              style={{ backgroundColor: label.color }}
              key={index}
            />
          ))}
      </div>
      <div
        id="card"
        className="d-flex align-items-start"
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
              onClick={toggleAreYouSureIsOpen}
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
        {areYouSureIsOpen && (
          <AreYouSure
            name={"this card"}
            isOpen={areYouSureIsOpen}
            onClose={toggleAreYouSureIsOpen}
            onConfirm={handleDeleteConfirm}
          />
        )}
        <Modal
          isOpen={modalIsOpen}
          style={{
            content: {
              width: "75%",
              position: "fixed",
              width: "75%",
              zIndex: "100",
              margin: "0 auto",
            },
          }}
        >
          <button onClick={handleCloseModalClick}>x</button>
          <Card className="card-modal" listId={props.listId} />
        </Modal>
      </div>
    </div>
  );
};

export default CardOnList;

CardOnList.propTypes = {
  cardId: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  cardLabel: PropTypes.array,
  cardDescription: PropTypes.string,
  listId: PropTypes.string.isRequired,
};
