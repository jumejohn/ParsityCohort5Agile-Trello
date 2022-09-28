import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import List from "./List";

// temporary front end example
const boards = [
  {
    _id: "1",
    boardName: "Test Board",
    lists: [
      {
        _id: "a",
        listName: "To do",
        cards: [
          {
            cardTitle: "Wash dishes",
          },
          {
            cardTitle: "Clean room",
          },
          {
            cardTitle: "Water backyard",
          }
        ],
      },
      {
        _id: "b",
        listName: "Completed",
        cards: [
          {
            cardTitle: "Brush teeth",
          },
          {
            cardTitle: "Walk the dog",
          }
        ],
      },
      {
        _id: "c",
        listName: "Hopes and Dreams",
        cards: [
          {
            cardTitle: "Become an astronaut",
          }
        ],
      },
      {
        _id: "d",
        listName: "Empty List",
        cards: [],
      }
    ],
  }
]

const BoardView = () => {
  const navigate = useNavigate();
  let { boardId } = useParams();
  let validBoard = boards.find(board => board._id == boardId);
  if (!validBoard) {
    navigate("/b")
  }

  let name = validBoard.boardName;
  let lists = validBoard.lists;

  return (
    <div className="container-fluid">
      <div className="row"><h3>{name}</h3></div>
      
      <div className="row d-flex flex-nowrap">
        {
          lists.map(list => (<List key={list._id} cards={list.cards} name={list.listName} />))
        }
        <div className="col-3">
          <div className="card bg-black">
            <div className="card-footer d-grid">
              <button className="btn btn-secondary" type="button">Add a list</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default BoardView;
