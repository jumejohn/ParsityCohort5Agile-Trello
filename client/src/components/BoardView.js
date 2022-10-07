import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBoard } from '../actions/BoardFetch';
import AddListBtn from './AddListBtn';
import List from './List';
import { editBoardTitle } from '../actions/EditBoardTitle';
import { useForm } from 'react-hook-form';

const BoardView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { boardId } = useParams();
  const { reset, register, handleSubmit } = useForm();
  const [isShow, setIsShow] = useState(false);
  // const currentUser = useSelector(
  //   (state) => state.rootReducer.user.currentUser.username
  // );

  const token = localStorage.token;
  const name = useSelector((state) => state.rootReducer.currentBoard.boardName);
  const lists = useSelector((state) => state.rootReducer.currentBoard.lists);
  console.log(lists);

  useEffect(() => {
    dispatch(fetchBoard(boardId, token)).then((res) => {
      if (!res) {
        console.log('no such board!');
        navigate('/b');
      }
    });
  }, []);

  const onSubmit = (data) => {
    dispatch(editBoardTitle(data, boardId));
    reset();
    setIsShow(!isShow);
  };

  const handleClick = () => {
    setIsShow(!isShow);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        {!isShow ? (
          <button onClick={handleClick}>{name}</button>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className='form-control'
              rows='1'
              {...register('boardDescription')} // ref={register}??
              // defaultValue={newDescription.boardDescription}
            ></textarea>
            <button type='submit' className='btn btn-primary'>
              Edit Board Name
            </button>
            <button
              onClick={handleClick}
              className='btn-close submit-button ms-auto'
              type='button'
              aria-label='Close'
            />
          </form>
        )}
      </div>

      <div className='row d-flex flex-nowrap'>
        {lists.map((list) => (
          <List
            key={list._id}
            cards={list.cards}
            name={list.listName}
            listId={list._id}
            boardId={boardId}
          />
        ))}
        <AddListBtn boardId={boardId} />
      </div>
    </div>
  );
};

export default BoardView;
