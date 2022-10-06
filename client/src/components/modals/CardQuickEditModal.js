import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { quickEditCard } from "../../actions/QuickEditCard";
import LabelModal from "./LabelModal";
import LabelEditor from "./LabelEditor";

const CardQuickEditModal = (props) => {
  // To get position of parent
  let BCR = props.getBCR();

  // For dynamic positioning
  const [modalTop, setModalTop] = useState(BCR.top);
  useEffect(() => {
    if (window.innerHeight - BCR.top < 100) {
      setModalTop(window.innerHeight - 100);
    } else {
      setModalTop(BCR.top);
    }
  });

  // For Label Editing Modal
  const boardLabels = useSelector(
    (state) => state.rootReducer.currentBoard.labels
  );
  const [labelsChanged, setLabelsChanged] = useState(false);
  const [labelModalIsOpen, setLabelModalIsOpen] = useState(false);
  const toggleLabelModalIsOpen = () => {
    setLabelModalIsOpen(!labelModalIsOpen);
  };
  const [cardLabels, setCardLabels] = useState(props.cardLabel);
  const toggleCardLabels = (labelIndex) => {
    let newArray = [...cardLabels];
    let toggledLabel = boardLabels[labelIndex];
    let alreadyChecked = cardLabels.findIndex(
      (label) => label.color === toggledLabel.color
    );
    if (alreadyChecked > -1) {
      newArray.splice(alreadyChecked, 1);
    } else {
      newArray.push(toggledLabel);
    }
    setCardLabels(newArray);
  };

  const [labelEditorIsOpen, setLabelEditorIsOpen] = useState(false);
  const [labelEditorType, setLabelEditorType] = useState("Edit");
  const [labelEditorDefaults, setLabelEditorDefaults] = useState({
    color: null,
    name: null,
  });
  const toggleLabelEditorIsOpen = (type, color, name) => {
    if (type !== labelEditorType) setLabelEditorType(type);
    setLabelEditorDefaults({ color: color, name: name });
    setLabelEditorIsOpen(!labelEditorIsOpen);
    toggleLabelModalIsOpen();
  };

  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    if (data.editedCardTitle == props.cardTitle && !labelsChanged) {
      closeModal();
    }
    dispatch(
      quickEditCard(
        props.cardId,
        props.listId,
        data.editedCardTitle,
        cardLabels,
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

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          background: "none",
          border: "none",
          top: modalTop,
          left: BCR.left,
          width: BCR.width,
          padding: 0,
          display: "block",
          height: "fit-content",
        },
      }}
    >
      <div
        className="list-group-item"
        style={{ width: "100%", backgroundColor: "white" }}
      >
        <div className="row">
          {cardLabels.length > 0 &&
            cardLabels.map((label, index) => (
              <button
                className="col-3 btn"
                style={{ backgroundColor: label.color }}
                key={index}
              />
            ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} style={{ minHeight: "40%" }}>
          <textarea
            className="form-control"
            defaultValue={props.cardTitle}
            {...register("editedCardTitle")}
            style={{ height: "100%" }}
          />
          <div className="d-flex justify-content-between">
            <button
              className="btn submit-button flex-grow-0 save-button"
              type="submit"
            >
              Save
            </button>
            <button
              className="btn submit-button flex-grow-0 edit-button"
              onClick={toggleLabelModalIsOpen}
              type="button"
            >
              Edit Labels
            </button>
          </div>
        </form>
      </div>
      <LabelModal
        isOpen={labelModalIsOpen}
        onClose={toggleLabelModalIsOpen}
        onChange={toggleCardLabels}
        toggleChange={setLabelsChanged}
        cardLabels={cardLabels}
        openLabelEditor={toggleLabelEditorIsOpen}
      />
      <LabelEditor
        isOpen={labelEditorIsOpen}
        onClose={toggleLabelEditorIsOpen}
        type={labelEditorType}
        defaultName={labelEditorDefaults.name}
        defaultColor={labelEditorDefaults.color}
      />
    </Modal>
  );
};

CardQuickEditModal.propTypes = {
  cardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  cardTitle: PropTypes.string,
  cardLabel: PropTypes.array,
  cardDescription: PropTypes.string,
  cardComments: PropTypes.array,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  getBCR: PropTypes.func,
};

export default CardQuickEditModal;
