import React, { useEffect, useState } from "react";
import "../styles/viewerDetails.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserDetails = () => {
  const reactNavigator = useNavigate();
  const [loading, setLoading] = useState(true);
  const [nname, setName] = useState();
  const [dob, setDob] = useState();
  const [location, setLocation] = useState();
  const [gender, setGender] = useState();
  const [phoneNo, setphoneNo] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      const base_url = "https://blogejy.onrender.com";
      var config = {
        method: "GET",
        url: `${base_url}/auth/me`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(config).then((res) => {
        const user = res.data.user;
        setName(user.name);
        setDob(user.dob);
        setLocation(user.location);
        setphoneNo(user.phoneNo);
        setGender(user.gender);
        setRole(user.role);
        setLoading(false);
      });
    };
    init();
    return <></>;
  }, []);

  if (!loading && !dob) {
    return (
      <>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location = "/login";
          }}
        >
          Log Out
        </button>
        <button
          onClick={() => {
            window.location = "/login";
          }}
        >
          Home
        </button>
        <div className="user-detail">
          <h2>User Details</h2>
          <div className="user-detail-item">
            <strong>Name:</strong> {nname}
          </div>
          <div className="user-detail-item">
            <strong>Phone Number:</strong> {phoneNo}
          </div>
          <div className="user-detail-item">
            <strong>Location:</strong> {location}
          </div>
          <div className="user-detail-item">
            <strong>Gender:</strong> {gender}
          </div>
          <div className="user-detail-item">
            <strong>Role</strong> {role}
          </div>
        </div>
      </>
    );
  }

  if (!loading) {
    return (
      <>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location = "/login";
          }}
        >
          Log Out
        </button>
        <button
          onClick={() => {
            window.location = "/login";
          }}
        >
          Home
        </button>
        <div className="user-detail">
          <h2>User Details</h2>
          <div className="user-detail-item">
            <strong>Name:</strong> {nname}
          </div>
          <div className="user-detail-item">
            <strong>Phone Number:</strong> {phoneNo}
          </div>
          <div className="user-detail-item">
            <strong>Location:</strong> {location}
          </div>
          <div className="user-detail-item">
            <strong>Gender:</strong> {gender}
          </div>

          <div className="user-detail-item">
            <strong>Date of Birth:</strong> {dob}
          </div>

          <div className="user-detail-item">
            <strong>Role</strong> {role}
          </div>
        </div>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};
