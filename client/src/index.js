import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store";
import App from './App';
import Board from './components/Board';
import BoardLayout from './components/BoardLayout';
import Login from './components/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/b" element={<BoardLayout />} />
        <Route path="/:id" element={<Board />} />
      <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
