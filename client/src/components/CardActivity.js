import { useSelector } from 'react-redux'

const CardActivity = () => {
  const activity = useSelector(
    (state) => state.rootReducer.currentCard.cardActivity || null
  )

  if (activity) {
    const displayedActivity = activity.map((event, index) => {
      return <p key={[event] + index}>{event}</p>
    })
    return displayedActivity
  } else {
    return <ul></ul>
  }
}
export default CardActivity
