import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { handleLogin } from "../actions/Login";
import { useNavigate } from "react-router-dom";

// hardcoded users for now
const users = [
  {
    username: "tester2",
    firstname: "Mark",
    lastname: "Cook",
    email: "mark.cook@email.com",
    phone: 222333444,
    avatarUrl: "https://thumbs.dreamstime.com/z/cool-kid-10482439.jpg",
    contacts: [],
    organization: [],
    password: "password",
  }
];
const org1 = {
  _id: "12345",
  orgName: "test organization",
  orgOwner: "tester1",
  orgBoards: [],
};
const board1 = {
  boardname: "Test Board",
  users: [],
  lists: [
    {
      _id: "1",
      listName: "todos",
      cards: [
        {
          cardTitle: "Clean Room",
        },
        {
          cardTitle: "Wash Dishes"
        }
      ],
    }
  ],
};
org1.orgBoards.push(board1);
users[0].organization.push(org1);

const Login = () => {
  const isLoggedIn = useSelector(state => state.reducer.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // For now, we will search the users array, then dispatch the action
    // Later, we can use axios to send a request to the server, then dispatch
    // based on success
    console.log(data);
    let validUser = users.find(user => user.username === data.username && user.password === data.password);
    if (validUser) {
      dispatch(handleLogin(validUser));
      navigate("/");
    } else {
      alert("Invalid username/password");
    }
  }

  if (!isLoggedIn) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")}/>
        <input type={"password"} {...register("password")}/>
        <input type="submit"/>
      </form>
    )
  }
};

export default Login;
