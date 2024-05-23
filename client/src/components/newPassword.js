import React, { useState } from "react";
import "../styles/newpassword.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function NewPasswordScreen() {
  const reactNavigator = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const base_url = "https://blogejy.onrender.com";
  let email = localStorage.getItem("email");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      await axios
        .post(`${base_url}/reset/user/forgot/change`, {
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.data == "Password changed successfully") {
            toast.success("Password changed successfully");
            reactNavigator("/login");
          } else {
            toast.error("Error changing password");
          }
        });
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="f1">
      <h2 className="f2">New Password</h2>
      <form onSubmit={handleSubmit} className="f3">
        <div className="f4">
          <label className="f5">New Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="f6"
          />
        </div>
        <div className="f7">
          <label className="f8">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="f9"
          />
        </div>
        <button type="submit" className="f10">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default NewPasswordScreen;
