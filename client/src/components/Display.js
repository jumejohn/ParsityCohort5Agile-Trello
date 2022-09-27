import { useSelector } from "react-redux";
import Board from './Board'
import '../css/Display.css'
const Display = () => {
  const boardsData = useSelector(({reducer}) => reducer.user.organization[0].orgBoards)
  const renderBoards = () => {
    const boardsArray = boardsData.map( (board, i) => {
      return (<Board key={i}></Board>)
    })

    return boardsArray
  }
  return (
    <section className="container">
      <section className="row row-cols-3 boards__section gy-5">
          {renderBoards()}
          <button className="btn btn-primary   ">Add New Board</button>

      </section>
    </section>

  )
  
};

export default Display;
