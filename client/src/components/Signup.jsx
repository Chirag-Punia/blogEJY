import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {

  const base_url = "http://localhost:5000";
  const reactNavigator = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${base_url}/auth/signup`, {
        email,
        name,
        password,
        confirmpassword,
        dob,
        phoneNo,
        location,
        gender
      })
      .then((res) => {
        if (res.data === "password does not match") {
          toast.error("password does not match");
          return;
        } else if (res.data === "Enter all required field") {
          toast.error("Enter all required field");
          return;
        } else if (res.data === "Password should be at least 6 characters") {
          toast.error("Password should be at least 6 characters");
          return;
        } else if (res.data === "Email already exist") {
          toast.error("Email already exist");
        } else if (res.data === "User created") {
          reactNavigator("/");
        }
      });
  };
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [phoneNo, setphoneNo] = useState();
  const [location, setLocation] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  return (
    <>
     <button onClick={() => {
      window.location = "/";
    }}>Home</button>
      <div className="wrapper Signup">
        <div className="form">
          <div className="heading">Create an Account</div>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  setconfirmpassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Enter Location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <input
                type="text"
                placeholder="Enter Gender"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                onChange={(e) => {
                  setphoneNo(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="text"
                placeholder="Enter Date of Birth"
                onChange={(e) => {
                  setDob(e.target.value);
                }}
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
            <p className="pp">
              Have an Account ?<Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;