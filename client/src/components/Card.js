import React from "react";
import { loadCard } from "../actions/LoadCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const cards = [
  {
    cardTitle: "Clean Room",
  },
  {
    cardTitle: "Wash Dishes",
  },
];

const Card = () => {
    const currentUser = useSelector((state) => state.reducer.userID);
    //useEffect(useDispatch(loadCard(currentUser)));
    //const card = useSelector((state) => state.cards);
    console.log("this", currentUser);
  return cards.map((card) => {
    return (
      <div className="card" key={card.cardTitle}>
        <div className="card-body">{card.cardTitle}</div>
      </div>
    );
  });
};

export default Card;
