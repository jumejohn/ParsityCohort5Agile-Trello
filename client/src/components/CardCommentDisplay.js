import { useSelector } from "react-redux";

const currentCard = localStorage.card;

const CommentsDiplay = () => {
  const currentComments = useSelector(
    (state) => state.rootReducer.currentCard.cardComments
  );
  console.log("cardCommentDisplay", currentComments);

  if (currentComments) {
    currentComments.map((comment) => {
      return <li>{comment}</li>;
    });
  } else {
    return <p>comments</p>;
  }
};

export default CommentsDiplay;
