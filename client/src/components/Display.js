import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import Board from "./Board";
import "../css/Display.css";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { axiosAuth } from "../utils/axiosAuth";

const addModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const removeModalStyles = {
  content: {
    top: "10%",
    left: "30%",
    right: "30%",
    bottom: "10%",
  },
};
const Display = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [boards, setBoards] = useState([]);
  const [removeModalIsOpen, setRemoveIsOpen] = useState(false);
  const user = useSelector((state) => state.rootReducer.user.currentUser);

  const fetchBoardData = () => {
    const url = `/organization/${user.organization._id}/boards`;
    const token = localStorage.token;
    const config = {
      method: "get",
      url,
      headers: { Authorization: `Bearer ${token}` },
    };

    axiosAuth(config).then((data) => {
      setBoards(data.data.orgBoards);
    });
  };

  useEffect(() => {
    if (user && boards.length === 0) {
      fetchBoardData();
    }
  }, [user]);

  const navigate = useNavigate();
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openRemoveModal() {
    setRemoveIsOpen(true);
  }

  function closeRemoveModal() {
    setRemoveIsOpen(false);
  }

  const createBoard = (e) => {
    e.preventDefault();
    const url = `/boards/`;
    const token = localStorage.token;
    const config = {
      method: "post",
      url,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        boardName: title,
        organization: user.organization._id,
        users: user.organization.orgMembers,
      },
    };
    axiosAuth(config)
      .then((res) => {
        closeModal();
        navigate(`/b/${res.data._id}`);
      })
      .catch((err) => console.log("ERROR", err));
  };

  const removeBoard = (id) => {
    const url = `/boards/${id}`;
    const token = localStorage.token;
    const config = {
      method: "delete",
      url,
      headers: { Authorization: `Bearer ${token}` },
    };
    axiosAuth(config).then(() => {
      // refresh page
      navigate(0);
    });
    closeRemoveModal();
  };

  const renderBoardList = () => {
    if (user) {
      const list = boards.map((board) => {
        return (
          <li key={board._id} className="list-item row mb-2">
            <span className="col-md-6">{board.boardName}</span>
            <button
              type="button"
              className="btn submit-button danger col-md-4"
              onClick={() => removeBoard(board._id)}
            >
              Remove
            </button>
          </li>
        );
      });
      return list;
    }
  };

  const renderBoards = () => {
    const boardsArray = boards.map((board, i) => {
      return (
        <Board
          key={i}
          boardId={board._id}
          boardName={board.boardName}
          numLists={board.lists.length}
        ></Board>
      );
    });

    return boardsArray;
  };
  if (user) {
    return (
      <section className="container">
        <section className="row row-cols-3 boards__section gy-5 gx-2 justify-content-center">
          {renderBoards()}
          <button className="card2__add" onClick={openModal}>
            <h3 className="board__btn">Add New Board</h3>
            <p className="small"></p>
          </button>
          <button
            className="btn-danger card2__remove"
            onClick={openRemoveModal}
          >
            <h3 className="board__btn">Remove a Board</h3>
          </button>
        </section>
        <Modal
          isOpen={removeModalIsOpen}
          onRequestClose={closeRemoveModal}
          contentLabel="Remove board modal"
          style={removeModalStyles}
        >
          <div className="scroll-component">
            <div className="scroll-content">
              <button
                onClick={closeRemoveModal}
                className="btn-close submit-button ms-auto"
                type="button"
                aria-label="Close"
              />
              <h2>Remove a Board</h2>
              <ul>{renderBoardList()}</ul>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={addModalStyles}
          contentLabel="Example Modal"
        >
          <button
            onClick={closeModal}
            className="btn-close submit-button ms-auto"
            type="button"
            aria-label="Close"
          />{" "}
          <h2>Create New Board</h2>
          <div>Board Name</div>
          <form onSubmit={(e) => createBoard(e)}>
            <input onChange={(e) => setTitle(e.target.value)} />
            <button className="submit-button save-button" type="submit">
              Create
            </button>
          </form>
        </Modal>
      </section>
    );
  } else {
    return (
      <div className="d-flex justify-content-center">Loading boards...</div>
    );
  }
};
Modal.setAppElement("#root");

export default Display;
