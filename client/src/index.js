import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store";
import App from './App';
import BoardViewLayout from './components/BoardViewLayout';
import BoardView from './components/BoardView';
import Login from './components/Login';
import NoBoardView from './components/NoBoardView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/b" element={<BoardViewLayout />}>
        <Route path=":boardId" element={<BoardView />} />
        <Route path="*" element={<NoBoardView />} />
      </Route>
      <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
