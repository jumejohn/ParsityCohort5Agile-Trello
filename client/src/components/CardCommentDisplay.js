import { useEffect } from "react";
import { useSelector } from "react-redux";

const currentCard = localStorage.card;

const CommentsDiplay = () => {
  const currentComments = useSelector(
    (state) => state.rootReducer.currentCard.cardComments
  );
  // console.log("cardCommentDisplay", currentComments);
  useEffect(() => {
    //load the card that is clicked
    renderComments();
  }, []);
  const renderComments = () => {
    if (currentComments) {
      const displayedComments = currentComments.map((comment) => {
        return (
          <tbody key={comment._id}>
            <tr className="comment-user">
              <td>
                <strong className="comment-username">
                  {comment.commentUser} says:
                </strong>
              </td>
            </tr>
            <tr className="comment-text">
              <td>{comment.commentText}</td>
            </tr>
          </tbody>
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
