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
  }

  const onNewListSubmit = (data) => {
    dispatch(createList(data.newListTitle, props.boardId));
    toggleTempListIsOpen();
  }

  if (tempListIsOpen) {
    return (
      <ClickDetectWrapper callback={toggleTempListIsOpen}>
        <div className="col-3">
          <div className="card bg-black">
            <form onSubmit={handleSubmit(onNewListSubmit)}>
              <div className="card-body">
                <input className="form-control" placeholder="Enter list title..." {...register("newListTitle")}/>
              </div>
              <div className="card-footer d-flex align-items-center gap-2">
                <button className="btn btn-secondary" type="submit">
                  Add List
                </button>
                <button className="btn-close btn-close-white" onClick={toggleTempListIsOpen} type="button" aria-label="Close" />
              </div>
            </form>
          </div>
        </div>
      </ClickDetectWrapper>
    )
  }

  return (
    <div className="col-3">
      <div className="card bg-black">
        <div className="card-footer d-grid">
          <button
            className="btn btn-secondary"
            onClick={toggleTempListIsOpen}
            type="button"
          >
            Add a list
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddListBtn;
