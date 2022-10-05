import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { createList } from "../actions/CreateList";
import { deleteList } from "../actions/DeleteList";
import ListTitle from "./ListTitle";
import ListFooter from "./ListFooter";
import CardOnList from "./CardOnList";
import ClickDetectWrapper from "./ClickDetectWrapper";
import {CSS} from '@dnd-kit/utilities';
import {
  useSortable,
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
const List = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const handleCancelClick = () => {
    dispatch({ type: "CANCEL_ADD_LIST" });
    console.log("cancelled!")
  }

  const handleDeleteClick = () => {
    dispatch(deleteList(props.listId));
  };

  const onNewListSubmit = (data) => {
    dispatch(createList(data.newListTitle, props.boardId))
  }

  let cards = props.cards;
  let name = props.name;
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  // If the list rendering is a "temporary" list that will be added to the board
  if (!name) {
    return (
      <ClickDetectWrapper callback={handleCancelClick}>
        <div className="col-3">
          <div className="card bg-black" >
            <form onSubmit={handleSubmit(onNewListSubmit)}>
              <div className="card-body">
                <input className="form-control" placeholder="Enter list title..." {...register("newListTitle")}/>
              </div>
              <div className="card-footer d-flex align-items-center gap-2">
                <button className="btn btn-secondary" type="submit">
                  Add List
                </button>
                <button className="btn-close btn-close-white" onClick={handleCancelClick} type="button" aria-label="Close" />
              </div>
            </form>
          </div>
        </div>
      </ClickDetectWrapper>
    )
  }

  // This is what renders for normal lists
  return (
    <div className="col-3" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="card bg-black">
        <div className="card-body" style={{"paddingBottom": "0"}}>
          <div className="card-title text-white row d-flex align-items-center">
            <div className="col-11"><ListTitle name={name} listId={props.listId} listCards={cards} /></div>
            <button className="btn-close btn-close-white col-1" onClick={handleDeleteClick} type="button" aria-label="Close" /> 
          </div>
          <SortableContext 
        items={cards.map(card => card._id)}
        strategy={verticalListSortingStrategy}
      >
          <ul className="list-group gap-2">
            {cards.map((card) => <CardOnList 
              key={card._id} 
              cardId={card._id} 
              cardTitle={card.cardTitle} 
              cardLabel={card.cardLabel}
              cardDescription={card.cardDescription} 
              listId={props.listId} 
            />)}
          </ul>
        </SortableContext>

        </div>
        <div className="card-footer d-grid">
          <ListFooter listId={props.listId}/>
        </div>
      </div>
    </div>
  );
};

List.propTypes = {
  cards: PropTypes.array,
  name: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
};

export default List;
