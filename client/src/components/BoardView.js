import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  closestCenter,
  pointerWithin,
  rectIntersection,
  DndContext,
  getFirstCollision,
  KeyboardSensor,
  useSensors,
  useSensor,
  PointerSensor,
  MeasuringStrategy,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { fetchBoard } from "../actions/BoardFetch";
import AddListBtn from "./AddListBtn";
import List from "./List";
import { SortableList } from './SortableList';
import { SortableCard } from './SortableCard';
import Card from './Card';
import CardClone from './CardClone';

import { moveLists } from '../actions/MoveLists';
import { moveCard } from '../actions/MoveCard';
const BoardView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { boardId } = useParams();
  const token = localStorage.token;
  const board = useSelector(({rootReducer}) => rootReducer.currentBoard)
  const user = useSelector(({rootReducer}) => rootReducer.user.currentUser?.username)
  const name = useSelector((state) => state.rootReducer.currentBoard.boardName);
  const items = useSelector((state) => state.rootReducer.currentBoard.lists);
  const containers = useSelector(({rootReducer}) => rootReducer.normalizedLists.order)
  const lists = useSelector(({rootReducer}) => rootReducer.normalizedLists.normalized)
  // const [lists, setLists] = useState(items);
  // const [containers, setContainers] = useState(Object.keys(lists));
  const [activeId, setActiveId] = useState(null);
  // const isSortingContainer = activeId ? containers.includes(activeId) : false;
  const lastOverId = useRef(null);
  const recentlyMovedToNewContainer = useRef(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MyPointerSensor, {
      activationConstraint: {
        distance: 2
      },
    })
  );

  useEffect(() => {
    dispatch(fetchBoard(boardId, token)).then((res) => {
      if (!res) {
        console.log("no such board!");
        navigate("/b");
      }
    });
  }, []);

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeId && activeId in lists) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in lists
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, 'id');

      if (overId != null) {
        if (overId in lists) {
          const containerItems = lists[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, lists]
  );

  const [clonedItems, setClonedItems] = useState(null);

  const findContainer = (id) => {
    if (id in lists) {
      return id;
    }

    return Object.keys(lists).find((key) => lists[key].includes(id));
  };

  const getIndex = (id) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = lists[container].indexOf(id);

    return index;
  };

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      dispatch({
        type: 'RESET_LIST',
        payload: clonedItems
      })
    }

    setActiveId(null);
    setClonedItems(null);
  };
  const findCardTitle = (cardId) => {
    let title = ''
    for(const listId in lists){
      if(lists[listId].includes(cardId)){
        const list = items.find(item => {
          return item._id == listId
        })
        title = list.cards.find(card => card._id == cardId).cardTitle
      }
    }
    return title
  }


  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [lists]);

  return (
    <DndContext
    sensors={sensors}
    collisionDetection={collisionDetectionStrategy}
    measuring={{
      droppable: {
        strategy: MeasuringStrategy.Always,
      },
    }}
    onDragStart={({ active }) => {
      
      setActiveId(active.id);
      setClonedItems(lists);
    }}
    onDragOver={({ active, over }) => {
      const overId = over?.id;

      // Note: when moving lists we just return here and do not do anything
      if (overId == null || active.id in lists) {
        return;
      }

      const overContainer = findContainer(overId);
      const activeContainer = findContainer(active.id);

      if (!overContainer || !activeContainer) {
        return;
      }

      if (activeContainer !== overContainer) {
        
          const activeItems = lists[activeContainer];
          const overItems = lists[overContainer];
          const overIndex = overItems.indexOf(overId);
          const activeIndex = activeItems.indexOf(active.id);

          let newIndex;

          if (overId in lists) {
            newIndex = overItems.length + 1;
          } else {
            const isBelowOverItem =
              over &&
              active.rect.current.translated &&
              active.rect.current.translated.top >
                over.rect.top + over.rect.height;

            const modifier = isBelowOverItem ? 1 : 0;

            newIndex =
              overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
          }

          recentlyMovedToNewContainer.current = true;

          const updatedLists = {
            ...lists,
            [activeContainer]: lists[activeContainer].filter(
              (item) => item !== active.id
            ),
            [overContainer]: [
              ...lists[overContainer].slice(0, newIndex),
              lists[activeContainer][activeIndex],
              ...lists[overContainer].slice(
                newIndex,
                lists[overContainer].length
              ),
            ],
          };
          dispatch({type: "MOVE_CARD", payload: {order: containers, updatedLists}})
      }
    }}
    onDragEnd={({ active, over }) => {
      // If id is in items we are moving a CONTAINER
      if (active.id in lists && over?.id) {
          const activeIndex = containers.indexOf(active.id);
          const overIndex = containers.indexOf(over.id);
          const newOrder = arrayMove(containers, activeIndex, overIndex);
          Promise.all([
            dispatch({type:"MOVE_LIST", payload: { newOrder, oldLists: items }}),
            dispatch(moveLists(boardId, token, newOrder, items, user, board)) 
          ])
          
      }

      const activeContainer = findContainer(active.id);

      if (!activeContainer) {
        setActiveId(null);
        return;
      }

      const overId = over?.id;

      if (overId == null) {
        setActiveId(null);
        return;
      }

      const overContainer = findContainer(overId);

      if (overContainer) {
        const activeIndex = lists[activeContainer].indexOf(active.id);
        const overIndex = lists[overContainer].indexOf(overId);
        if (activeIndex !== overIndex) {
          const updatedLists = {
            ...lists,
            [overContainer]: arrayMove(
              lists[overContainer],
              activeIndex,
              overIndex
            ),
          }
          Promise.all([
            dispatch({type: "MOVE_CARD", payload: {order: containers, updatedLists}}),
            dispatch(moveCard(boardId, token, updatedLists, containers, items, board))
          ])

        }
      }

      setActiveId(null);
    }}
  >
    <div className="container-fluid">
      <div className="row">
        <h3 className="board-name">{name}</h3>
      </div>

      <div className="row d-flex flex-nowrap">
      <SortableContext
        items={containers}
        strategy={horizontalListSortingStrategy}
      >
        {items.map((list) => (
          <SortableList
            key={list._id}
            cards={list.cards}
            name={list.listName}
            listId={list._id}
            boardId={boardId}
          >
            <SortableContext
                    items={lists[list._id]}
                    strategy={rectSortingStrategy}
                  >
              {list.cards.map((card) => <SortableCard 
                  key={card._id} 
                  cardId={card._id} 
                  cardTitle={card.cardTitle} 
                  cardLabel={card.cardLabel}
                  cardDescription={card.cardDescription} 
                  listId={list._id} 
                />)}
              </SortableContext>
            </SortableList>
        ))}
        </SortableContext>
        <DragOverlay>
                {activeId ? (containers.includes(activeId) ? null : <CardClone id={activeId} cardId={activeId}
                  cardTitle={findCardTitle(activeId)} 
                  />) : null}
                  
              </DragOverlay>
        <AddListBtn boardId={boardId} />
      </div>
    </div>
  </DndContext>
  );
};

export default BoardView;


class MyPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown',
      handler: ({nativeEvent: event}) => {
        if (
          !event.isPrimary ||
          event.button !== 0 ||
          isInteractiveElement(event.target)
        ) {
          return false;
        }
        if(document.getElementsByClassName('ReactModal__Body--open').length == 1){
          return false;
        }
        
        return true;
      },
    },
  ];
}

function isInteractiveElement(element) {
  const interactiveElements = [
    'modal',
    'input',
    'textarea',
    'select',
    'option',
  ];

  if (interactiveElements.includes(element.tagName.toLowerCase())) {
    return true;
  }

  return false;
}