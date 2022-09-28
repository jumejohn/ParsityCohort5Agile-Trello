import React from "react";
import PropTypes from "prop-types";

const List = (props) => {
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
                <button className="list-group-item list-group-item-action" key={i}>
                  {card.cardTitle}
                </button>
              )
            })}
          </ul>
        </div>
        <div className="card-footer d-grid">
          <button className="btn btn-secondary" type="button">Add a card</button>
        </div>
      </div>
    </div>
  )
}

List.propTypes = {
  cards: PropTypes.array,
  name: PropTypes.string.isRequired,
}

export default List;
