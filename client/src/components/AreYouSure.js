import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

const AreYouSure = (props) => {

  return (
    <Modal 
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      style={{
        "overlay": {
          "display": "flex",
          "justifyContent": "center",
        },
        "content": {
          "maxWidth": "fit-content",
          "maxHeight": "fit-content",
          "inset": "10% auto",
        }
      }}
    >
      <p>Are you sure you want to delete {props.name}?</p>
      <div className="btn-group d-flex">
        <button onClick={props.onConfirm} className="btn btn-danger">Yes</button>
        <button onClick={props.onClose} className="btn btn-secondary">No</button>
      </div>
    </Modal>
  )
}

export default AreYouSure;

AreYouSure.propTypes = () => {
  name = PropTypes.string,
  isOpen = PropTypes.bool,
  onClose = PropTypes.func,
  onConfirm = PropTypes.func,
}
