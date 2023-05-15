import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { handleLogin } from "../actions/Login";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(
      handleLogin(data, () => {
        navigate("/");
      })
    );
  };

  const gotoLogin = () => {
    navigate('/login')
  }

  return (      
  <>
    <header className="input_header">
      <h1 className="input_h1">Cohort 5 Agile Project Board</h1>
    </header>
    <div className="input_div">
      <div className="input_jumbotron">
        <div className="input_container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input_div">
              <label className="input_label">
                <h5 className="input_h5">Username:</h5>
                <input
                  {...register("username")}
                  placeholder="username"
                  className="input_field"
                />
              </label>
            </div>
            <div className="input_div">
              <label className="input_label">
                <h5>Password:</h5>
                <input
                  type={"password"}
                  {...register("password")}
                  placeholder="password"
                  className="input_field"
                />
              </label>
            </div>
            <div className="input_div">
              <input type="submit" className="input_submit_button" value="Register Account" />
            </div>
          </form>
          <div className="input_div mt-2">
              <input type="button" className="input_submit_button" value="Login" onClick={() => gotoLogin()}></input>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Register;