import { useSelector } from "react-redux";

const currentCard = localStorage.card;

const CommentsDiplay = () => {
  const currentComments = useSelector(
    (state) => state.rootReducer.user.currentUser.cardComments || null
  );
  console.log(currentComments);

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
