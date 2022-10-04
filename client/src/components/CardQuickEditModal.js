import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { quickEditCard } from "../actions/QuickEditCard";

const CardQuickEditModal = (props) => {
  // To get position of parent
  let BCR = props.getBCR();
  
  // For dynamic positioning
  const [modalTop, setModalTop] = useState(BCR.top);
  useEffect(() => {
    if (window.innerHeight - BCR.top < 100) {
      setModalTop(window.innerHeight - 100);
    }
  })

  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    if (data.editedCardTitle == props.cardTitle) {
      closeModal();
    }
    dispatch(quickEditCard(props.cardId, props.listId, data.editedCardTitle, props.cardLabel, props.cardDescription));
    closeModal();
  }

  const closeModal = () => {
    reset();
    props.closeModal();
  }

  return (
    <Modal 
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      style={{
        "content": {
          "background": "none",
          "border": "none",
          "top": modalTop,
          "left": BCR.left,
          "width": BCR.width,
          "padding": 0,
          "display": "block",
          "height": "fit-content",
        }
      }}
    >
      <div className="list-group-item" style={{"height": "100%"}}>
        <form onSubmit={handleSubmit(onSubmit)} style={{"minHeight": "40%"}}>
          <textarea 
            className="form-control"
            defaultValue={props.cardTitle} 
            {...register("editedCardTitle")}
            style={{"height": "100%"}}
          />
          <button className="btn btn-primary" type="submit">Save</button>
        </form>
      </div>
    </Modal>
  )
}

CardQuickEditModal.propTypes = {
  cardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  cardTitle: PropTypes.string,
  cardLabel: PropTypes.string,
  cardDescription: PropTypes.string,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  getBCR: PropTypes.func,
}

export default CardQuickEditModal;