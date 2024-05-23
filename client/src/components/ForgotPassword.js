import "../styles/forgot.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const base_url = "https://blogejy.onrender.com";
export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const reactNavigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    if (loading) {
      await axios
        .post(`${base_url}/reset/user/forgot/verify`, {
          email: email,
          otp: otp,
        })
        .then((res) => {
          if (res.data == "user does not exist") {
            toast.error("User does not exist");
          }
          if (res.data == "verified") {
            reactNavigator("/newpassword");
          } else if (res.data == "error") {
            toast.error("Invalid OTP");
          }
        });
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("email", email);

    await axios
      .post(`${base_url}/reset/user/forgot`, {
        email: email,
      })
      .then((res) => {
        if (res.data == "user do not exist") {
          toast.error("User does not exist");
          reactNavigator("/signup");
        } else {
          setMessage(`OTP has been sent to your ${email}`);
          toast.success("Enter OTP");
          setLoading(true);
        }
      });
  };

  return (
    <div className="d1">
      <h2 className="d2">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="d3">
        <div className="d4">
          <label className="d5">Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="d6"
          />
        </div>
        <button type="submit" className="d7">
          Reset Password
        </button>
      </form>
      {message && <p className="d8">{message}</p>}
      <label className="d5">OTP:</label>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        className="d6"
      />
      <button
        style={{ margin: "10px" }}
        type="submit"
        className="d7"
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
}
