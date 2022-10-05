import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBoard } from "../actions/BoardFetch";
import AddListBtn from "./AddListBtn";
import List from "./List";

const BoardView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { boardId } = useParams();
  const token = localStorage.token;
  const name = useSelector((state) => state.rootReducer.currentBoard.boardName);
  const lists = useSelector((state) => state.rootReducer.currentBoard.lists);
  console.log(lists);

  useEffect(() => {
    dispatch(fetchBoard(boardId, token)).then((res) => {
      if (!res) {
        console.log("no such board!");
        navigate("/b");
      }
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <h3>{name}</h3>
      </div>

      <div className="row d-flex flex-nowrap">
        {lists.map((list) => (
          <List
            key={list._id}
            cards={list.cards}
            name={list.listName}
            listId={list._id}
            boardId={boardId}
          />
        ))}
        <AddListBtn boardId={boardId} />
      </div>
    </div>
  );
};

export default BoardView;
