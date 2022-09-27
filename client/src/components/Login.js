import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { handleLogin } from "../actions/Login";

const Login = () => {
  const isLoggedIn = useSelector(state => state.reducer.isLoggedIn);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(handleLogin(data));
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
