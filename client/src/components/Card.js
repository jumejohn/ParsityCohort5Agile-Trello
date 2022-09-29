import React from "react";
import { loadCard } from "../actions/LoadCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Card = () => {
  const currentCard = useSelector((state) => state.rootReducer || null);
  console.log(currentCard);
  if (currentCard) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{currentCard.cardTitle}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {currentCard.cardLabel}
          </h6>
          <p className="card-text">{currentCard.cardDescription}</p>
        </div>
      </div>
    );
  } else {
    <></>;
  }
};

export default Card;
