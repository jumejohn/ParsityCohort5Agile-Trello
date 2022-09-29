import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "react-modal";
import Card from "./Card";
import { loadCard } from "../actions/LoadCard";

const List = (props) => {
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
  let cards = props.cards;
  let name = props.name;

  // <li className="list-group-item" key={i}>{card.cardTitle}</li>)
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
};

export default List;
