import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createList } from "../actions/CreateList";
import ClickDetectWrapper from "./ClickDetectWrapper";

const AddListBtn = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const [tempListIsOpen, setTempListIsOpen] = useState(false);
  const toggleTempListIsOpen = () => {
    setTempListIsOpen(!tempListIsOpen);
    reset();
  };

  const onNewListSubmit = (data) => {
    dispatch(createList(data.newListTitle, props.boardId));
    toggleTempListIsOpen();
  };

  if (tempListIsOpen) {
    return (
      <ClickDetectWrapper callback={toggleTempListIsOpen}>
        <div className="col-3">
          <div className="card">
            <form onSubmit={handleSubmit(onNewListSubmit)}>
              <div className="card-body">
                <input
                  className="form-control label-input"
                  placeholder="Enter list title..."
                  {...register("newListTitle")}
                />
              </div>
              <div className="card-footer d-flex align-items-center gap-2">
                <button className="btn submit-button" type="submit">
                  Add List
                </button>
                <button
                  className="btn-close submit-button ms-auto"
                  onClick={toggleTempListIsOpen}
                  type="button"
                  aria-label="Close"
                />
              </div>
            </form>
          </div>
        </div>
      </ClickDetectWrapper>
    );
  }

  return (
    <div className="col-3">
      <div className="card list-title">
        <div className="card-footer d-grid">
          <button
            className="btn card-title"
            onClick={toggleTempListIsOpen}
            type="button"
          >
            <i className="fa fa-plus fa-1.5" />
            <span> </span>
            Add a list
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddListBtn;
