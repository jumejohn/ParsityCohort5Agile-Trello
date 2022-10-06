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

      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
        height: '20px',
      }}
    >
      <button       {...attributes}
      {...listeners}>handle</button>
      <CardOnList cardId={props.cardId} 
                  cardTitle={props.cardTitle} 
                  cardLabel={props.cardLabel}
                  cardDescription={props.cardDescription} 
                  listId={props.listId} />
    </div>
  );
}
