import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import PropTypes from "prop-types";

const LabelModal = (props) => {
  const boardLabels = useSelector(state => state.rootReducer.currentBoard.labels);
  const dispatch = useDispatch();

  const handleChange = (index) => {
    props.toggleChange(true);
    props.onChange(index);
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      preventScroll={true}
      style={{
        "overlay": {
          "backgroundColor": "none",
        },
        "content": {
          "height": "fit-content",
          "width": "fit-content",
          "padding": "0",
          "backgroundColor": "none",
        },
      }}
    >
      <div className="card">
        <h6 className="card-header">Labels</h6>
        <div className="list-group list-group-flush">
          {boardLabels.map((label, index) => {
            let labelName = "\u2800";
            if (label.name) labelName = label.name;
            let isChecked = false;
            if (props.cardLabels.some(cardLabel => cardLabel.color === label.color)) isChecked=true;
            return (
                <label key={index} className="list-group-item d-flex" style={{"cursor": "pointer", "width": "100%", "backgroundColor": label.color}}>
                  <input className="form-check-input flex-grow-0" type="checkbox" onChange={() => handleChange(index)} checked={isChecked} />
                  {labelName}
                  <button 
                    className="btn ms-auto flex-grow-0" 
                    style={{ padding: "0.15rem 0.3rem" }} 
                    type="button" 
                    onClick={() => props.openLabelEditor("Edit", label.color, label.name)}
                  >
                    <i className="fa fa-pencil" />
                  </button>
                </label>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}

export default LabelModal;

LabelModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  toggleChange: PropTypes.func,
  cardLabels: PropTypes.array,
  openLabelEditor: PropTypes.func,
}
