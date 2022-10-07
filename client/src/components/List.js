import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { deleteList } from "../actions/DeleteList";
import ListTitle from "./ListTitle";
import ListFooter from "./ListFooter";
import CardOnList from "./CardOnList";
import AreYouSure from "./modals/AreYouSure";

const List = (props) => {
  const dispatch = useDispatch();

  const [areYouSureIsOpen, setAreYouSureIsOpen] = useState(false);

  const toggleAreYouSureIsOpen = () => {
    setAreYouSureIsOpen(!areYouSureIsOpen);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteList(props.listId));
    toggleAreYouSureIsOpen();
  };

  let cards = props.cards;
  let name = props.name;

  return (
    <>
      <div className="card list-surround">
        <div className="card-body" style={{ paddingBottom: "0" }}>
          <div className="card-title row d-flex align-items-center">
            <div className="col-11 d-flex align-items-center justify-content-between">
              <ListTitle name={name} listId={props.listId} listCards={cards} />
              <i
                className="fa fa-bars stretch-2 fa-2x ml-auto"
                aria-hidden="true"
                {...props.attributes}
                {...props.listeners}
              />
            </div>
            <button
              className="btn-close btn-close-black col-1"
              onClick={toggleAreYouSureIsOpen}
              type="button"
              aria-label="Close"
            />
          </div>
          <div className="" style={{ overflowY: "auto" }}>
            <ul className="list-group gap-2">{props.children}</ul>
          </div>
        </div>
        <div className="card-footer d-grid">
          <ListFooter listId={props.listId} />
        </div>
      </div>
      {areYouSureIsOpen && (
        <AreYouSure
          name={name}
          isOpen={areYouSureIsOpen}
          onClose={toggleAreYouSureIsOpen}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
};

List.propTypes = {
  cards: PropTypes.array,
  name: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
};

export default List;
