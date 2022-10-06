import React from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { editLabels } from "../../actions/EditLabels";

const LabelEditor = (props) => {
  const colors = [
    // reds
    "#9F7074", "#DE3163", "#ffb3ba",
    // oranges
    "#ffc8a2", "#ffdfba",
    // yellows
    "#ffffba",
    // greens
    "#baffc9",
    // blues
    "#bae1ff",
    // purples
    "#957dad",
    // greys
    "abb2b9", "#808b96", "#212f3d",
  ]
  const dispatch = useDispatch();

  const boardId = useSelector(state => state.rootReducer.currentBoard._id);
  const boardLabels = useSelector(state => state.rootReducer.currentBoard.labels);
  const currentLabelIndex = boardLabels.findIndex(label => label.color === props.defaultColor);

  const { register, handleSubmit, reset, formState: { isDirty, isValid } } = useForm();
  const onSubmit = (data) => {
    const newLabel = {color: data.color};
    (data.name.length) ? newLabel.name = data.name : newLabel.name = null;
    let newLabels = [...boardLabels];
    newLabels[currentLabelIndex] = newLabel;
    dispatch(editLabels(boardId, newLabels));
    props.onClose();
    reset();
  }

  const handleDeleteClick = () => {
    const newLabels = [...boardLabels];
    newLabels.splice(currentLabelIndex,1);
    dispatch(editLabels(boardId, newLabels));
    props.onClose();
  }

  return(
    <Modal
      isOpen={props.isOpen}
      onRequestClose={() => {
        reset();
        props.onClose(props.type)
      }}
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
        <h6 className="card-header">{props.type} Label</h6>
      </div>
      <div className="card-body" style={{"padding": "0.5em"}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h6 className="card-subtitle">Title</h6>
          <input className="form-control" type="text" {...register("name")} defaultValue={props.defaultName}/>
          <h6 className="card-subtitle">Select a color</h6>
          <div>
            {colors.map((color, index) => {
              let isSelected = false;
              if (color === props.defaultColor) isSelected = true;
              let isDisabled = false;
              if (!isSelected && boardLabels.some(label => label.color === color)) isDisabled = true;
              return (
                <>
                  <input key={index} id={color} type="radio" {...register("color")} value={color} className="btn-check" autoComplete="off" defaultChecked={isSelected} disabled={isDisabled} />
                  <label className="btn" style={{"backgroundColor": color}} htmlFor={color} />
                </>
              )
            })}
          </div>          
          <hr style={{"margin": "8px 0px"}}/>
          <div className="d-flex">
            <button className="btn btn-primary d-flex-grow-0" type="submit" disabled={!isDirty || !isValid}>Save</button>
            <button className="btn btn-danger d-flex-grow-0 ms-auto" onClick={handleDeleteClick}>Delete</button>
          </div>
        </form>
      </div>
    </Modal>
  )
};

export default LabelEditor;

LabelEditor.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  type: PropTypes.string,
  defaultColor: PropTypes.string,
  defaultName: PropTypes.string,
}
