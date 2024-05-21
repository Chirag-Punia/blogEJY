import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";



const Login = () => {
  const base_url = "http://localhost:5000";
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const reactNavigator = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    localStorage.setItem("email",email);
    await axios
      .post(`${base_url}/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.msg === "Wrong password") {
          toast.error("Wrong password");
        } else if (res.data.msg === "Login successfully") {
          reactNavigator("/dashboard");
          toast.success("Login successfully");
        } else {
          toast.error("User does not exist");
          reactNavigator("/signup");
        }
      });
  };


  
  return (
    <>
     <button onClick={() => {
      window.location = "/";
    }}>Home</button>

      <div className={"wrapper signin"}>
        <div className="form">
          <div className="heading">Login Page</div>
          <form>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </form>
          <button onClick={handleClick}>Login</button>
          <p>
            Don't have an account ? <Link to="/signup"> Sign up </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
