import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import PropTypes from "prop-types";
import Card from "./Card";
import { createList } from "../actions/CreateList";
// import { loadCard } from "../actions/LoadCard";

const List = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClick = (e) => {
    setModalIsOpenToTrue();
    localStorage.setItem("card", e.target.value);
  };
  const setModalIsOpenToTrue = (e) => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const handleCancelClick = () => {
    dispatch({ type: "CANCEL_ADD_LIST" });
  }

  const onNewListSubmit = (data) => {
    // newListTitle = data.newListTitle
    // Here we need to dispatch List creator
    console.log(data)
    dispatch(createList(data.newListTitle, props.boardId))
  }

  let cards = props.cards;
  let name = props.name;

  // If the list rendering is a "temporary" list that will be added to the board
  if (!name) {
    return (
      <div className="col-3">
        <div className="card bg-black">
          <form onSubmit={handleSubmit(onNewListSubmit)}>
            <div className="card-body">
              <input className="form-control" placeholder="Enter list title..." {...register("newListTitle")}/>
            </div>
            <div className="card-footer d-flex align-items-center gap-2">
              <button className="btn btn-secondary" type="submit">
                Add List
              </button>
              <button className="btn-close btn-close-white" onClick={handleCancelClick} type="button" aria-label="Close" />
            </div>
          </form>
        </div>
      </div>
    )
  }

  // This is what renders for normal lists
  return (
    <div className="col-3">
      <div className="card bg-black">
        <div className="card-body">
          <h3 className="card-title text-white">{name}</h3>
          <ul className="list-group gap-2">
            {cards.map((card, i) => {
              return (
                <div key={card._id}>
                  <button
                    value={card._id}
                    onClick={handleClick}
                    className="list-group-item list-group-item-action"
                  >
                    {card.cardTitle}
                  </button>
                  <Modal isOpen={modalIsOpen}>
                    <button onClick={setModalIsOpenToFalse}>x</button>
                    <Card />
                  </Modal>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="card-footer d-grid">
          <button className="btn btn-secondary" type="button">
            Add a card
          </button>
        </div>
      </div>
    </div>
  );
};

List.propTypes = {
  cards: PropTypes.array,
  name: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
};

export default List;
