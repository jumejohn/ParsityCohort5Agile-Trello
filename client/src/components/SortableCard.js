import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CardOnList from './CardOnList';
export function SortableCard(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.cardId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <CardOnList cardId={props.cardId} 
                  cardTitle={props.cardTitle} 
                  cardLabel={props.cardLabel}
                  cardDescription={props.cardDescription} 
                  listId={props.listId} />
    </div>
  );
}
