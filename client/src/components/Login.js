import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { handleLogin } from "../actions/Login";

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

const Login = () => {
  const isLoggedIn = useSelector(state => state.reducer.isLoggedIn);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // For now, we will search the users array, then dispatch the action
    // Later, we can use axios to send a request to the server, then dispatch
    // based on success
    console.log(data);
    let validUser = users.find(user => user.username === data.username && user.password === data.password);
    if (validUser) {
      dispatch(handleLogin(validUser));
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
