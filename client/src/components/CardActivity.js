import { useSelector } from "react-redux";

const CardActivity = () => {
  const activity = useSelector(
    (state) => state.rootReducer.currentCard.cardActivity || null
  );
  console.log(activity);
  if (activity) {
    const displayedActivity = activity.map((event) => {
      return <p key={[event]}>{event}</p>;
    });
    return displayedActivity;
  } else {
    return <ul></ul>;
  }
};
export default CardActivity;
