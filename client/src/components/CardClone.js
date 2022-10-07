import React, { useEffect, useState } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const CardClone = (props) => {

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({id: props.id});
    
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    return (
      <div className="card" ref={setNodeRef} {...listeners} {...attributes} style={style}>
        <div className="card-body">
          <div
            className="row"
            style={{ width: "100%", backgroundColor: "white", margin: "0" }}
          >
            {props.cardTitle}
          </div>
        </div>
      </div>
    );
  } 

export default CardClone;
