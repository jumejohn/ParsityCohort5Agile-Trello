import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LOAD_CARD from "../actions/LoadCard";
const Card = () => {
  const currentUser = useSelector((state) => state.user);
  const cards = useSelector((state) => state.cards);
  useEffect(useDispatch(loadCard(currentUser)));
  console.log(cards);

  //   cards.forEach((element) => {
  //     return (
  //       <div>
  //         <div></div>
  //       </div>
  //     );
  //   });
};

export default Card;
