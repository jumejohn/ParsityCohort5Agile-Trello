import { useEffect } from "react";
import { useSelector } from "react-redux";

const currentCard = localStorage.card;

const CommentsDiplay = () => {
  const currentComments = useSelector(
    (state) => state.rootReducer.currentCard.cardComments
  );
  console.log("cardCommentDisplay", currentComments);
  useEffect(() => {
    //load the card that is clicked
    renderComments();
  }, []);
  const renderComments = () => {
    if (currentComments) {
      const displayedComments = currentComments.map((comment) => {
        return (
          <p key={comment._id}>
            <strong>{comment.commentUser}:</strong>
            <br /> {comment.commentText}
          </p>
        );
      });
      return displayedComments;
    } else {
      return (
        <ul>
          <li>comments</li>
        </ul>
      );
    }
  };
  return renderComments();
};

export default CommentsDiplay;
