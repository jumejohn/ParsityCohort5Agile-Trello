import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import Board from './Board'
import '../css/Display.css'
import React,  { useState } from 'react'
import Modal from 'react-modal';
import axios from 'axios'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const Display = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('')
  const user = useSelector(state => state.rootReducer.user.currentUser);

  const navigate = useNavigate()
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log('done!')
  }

  function closeModal() {
    setIsOpen(false);
  }

  const createBoard = (e) => {
    e.preventDefault()
    const url = `http://localhost:8000/boards/`
    const token = localStorage.token
    const config = {
      method: 'post',
      url,
      headers:  {'Authorization': `Bearer ${token}`},
      data: {
        boardName: title,
        organization: user.organization._id,
        users: user.organization.orgMembers
      }
    }
    axios(config).then((res) => {
      closeModal()     
      navigate(`/b/${res.data._id}`)
    }).catch((err) => console.log("ERROR", err))
  }

  // refactor this and replace with user data above
  const boardsData = useSelector(state => {
    if(state.rootReducer.user.currentUser){
      return state.rootReducer.user.currentUser.organization.orgBoards
    }
  });

  const renderBoards = () => {
    const boardsArray = boardsData.map((board, i) => {
      return (
        <Board
          key={i}
          boardId={board._id}
        ></Board>
      );
    });

    return boardsArray;
  };
  if(boardsData){
  return (
    <section className="container">
      <section className="row row-cols-3 boards__section gy-5 justify-content-center">
        {renderBoards()}
        <button className="btn btn-primary" onClick={openModal}>Add New Board</button>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>Close</button>
        <h2 >Create New Board</h2>
        <div>Board Name</div>
        <form onSubmit={(e) => createBoard(e)}>
          <input onChange={(e) => setTitle(e.target.value)}/>
          <button type="submit">Create</button>
        </form>
      </Modal>
    </section>
  )}
  else {
    <div>LOADING</div>
  }
};
Modal.setAppElement('#root')

export default Display;
