import { useSelector } from "react-redux";

const currentCard = localStorage.card;

const CommentsDiplay = () => {
  const currentComments = useSelector(
    (state) => state.rootReducer.currentCard.cardComments
  );
  console.log("cardCommentDisplaY", currentComments);

  if (currentCard) {
    if (currentComments) {
      currentComments.map((comment) => {
        return <li>{comment}</li>;
      });
    } else {
      return <p>comments</p>;
    }
  } else {
    null;
  }
};

export default CommentsDiplay;
