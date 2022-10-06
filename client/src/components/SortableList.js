/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import List from './List';

export function SortableList({boardId, cards, listId, name, children}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: listId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
    ref={setNodeRef}
      
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.8 : undefined,
      }}
      className="col-3">

      <List
        cards={cards}
        name={name}
        listId={listId}
        boardId={boardId}
        listeners={listeners}
        attributes={attributes}
      >

        {children}
      </List>
    </div>

  );
}
