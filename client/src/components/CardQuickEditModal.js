import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { quickEditCard } from "../actions/QuickEditCard";

const CardQuickEditModal = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    if (data.editedCardTitle == props.cardTitle) {
      closeModal();
    }
    dispatch(
      quickEditCard(
        props.cardId,
        props.listId,
        data.editedCardTitle,
        props.cardLabel,
        props.cardDescription,
        props.cardComments
      )
    );
    closeModal();
  };

  const closeModal = () => {
    reset();
    props.closeModal();
  };

  // To get position of parent
  let BCR = props.getBCR();

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          background: "none",
          border: "none",
          top: BCR.top,
          left: BCR.left,
          width: BCR.width,
          padding: 0,
        },
      }}
    >
      <div className="list-group-item" style={{ height: "100%" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ minHeight: "40%" }}>
          <textarea
            className="form-control"
            defaultValue={props.cardTitle}
            {...register("editedCardTitle")}
            style={{ height: "100%" }}
          />
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

CardQuickEditModal.propTypes = {
  cardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  cardTitle: PropTypes.string,
  cardLabel: PropTypes.string,
  cardDescription: PropTypes.string,
  cardComments: PropTypes.array,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  getBCR: PropTypes.func,
};

export default CardQuickEditModal;
