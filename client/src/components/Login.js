import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { handleLogin } from "../actions/Login";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import { handleRegister } from "../actions/Register";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    dispatch(
      handleLogin(data, () => {
        navigate("/");
      })
    );
  };

  const gotoRegister = () => {
    navigate("/register")
  }

  const demoLogin = () => {
    const date = new Date();
    let dummyData = date.getTime();
    const demoUser = {
      username: `testuser${dummyData}`,
      password: `testuser${dummyData}`,
      firstName: dummyData,
      lastName: dummyData,
    }
    dispatch(
      handleRegister(demoUser, () => {
        navigate("/");
    }))
  }


  // For now, we will search the users array, then dispatch the action
  // Later, we can use axios to send a request to the server, then dispatch
  // based on success
  // let validUser = users.find(user => user.username === data.username && user.password === data.password);
  // if (validUser) {
  //  } else {
  //   alert("Invalid username/password");

  //Changed this from a conditional depending on state to just looking for a token in the localStorage.
  //State can now be used on next components, but isn't necessary here.

    return (
      <>
        <header className="input_header">
          <h1 className="input_h1">Agile Project Board</h1>
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
                  <input type="submit" className="input_submit_button" value="Login"/>
                </div>
              </form>
              <div className="input_div mt-2">
                  <input type="button" className="input_submit_button" value="Register" onClick={() => gotoRegister()}></input>
              </div>
              <div className="input_div mt-2">
                  <input type="button" className="input_submit_button" value="Demo Login" onClick={() => demoLogin()}></input>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default Login;
