import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBoard } from "../actions/BoardFetch";
import AddListBtn from "./AddListBtn";
import List from "./List";

import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { updateListOrder } from "../actions/UpdateListOrder";

const BoardView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { boardId } = useParams();
  const token = localStorage.token;
  const name = useSelector(state => state.rootReducer.currentBoard.boardName);
  const lists = useSelector(state => {
    return state.rootReducer.currentBoard.lists
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
      dispatch(fetchBoard(boardId, token))
        .then(res => {
          if (!res) {
            console.log("no such board!")
            navigate("/b")
          }
        })
      }
    , []);

  return (
    <div className="container-fluid">
      <div className="row"><h3>{name}</h3></div>
      <div className="row d-flex flex-nowrap">
      <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={lists.map(list => list._id)}
        strategy={horizontalListSortingStrategy}
      >
        {
            lists.map(list => (<List key={list._id} cards={list.cards} name={list.listName} listId={list._id} boardId={boardId} id={list._id}/>))
        }
        
      </SortableContext>
    </DndContext>



        <AddListBtn />
      </div>
    </div>
  )
  function handleDragEnd(event) {
    const {active, over} = event;
    if (active.id !== over.id) {
        const oldIndex = lists.map(list => list._id).indexOf(active.id);
        const newIndex = lists.map(list => list._id).indexOf(over.id);
        dispatch(updateListOrder( arrayMove(lists, oldIndex, newIndex)))
      }
    }
};

export default BoardView;
