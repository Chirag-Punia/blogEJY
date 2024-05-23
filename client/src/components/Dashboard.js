import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const reactNavigator = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const init = async () => {
      const base_url = "https://blogejy.onrender.com";
      var config = {
        method: "GET",
        url: `${base_url}/auth/me`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(config).then((res) => {
        const role = res.data.user.role;

        if (role === "viewer") {
          reactNavigator("/viewer");
        }
        if (role === "creator") {
          reactNavigator("/creator");
        }
        if (role === "admin") {
          reactNavigator("/admin");
        }
        if (role === "verifier") {
          reactNavigator("/verifier");
        }
        if (role === "publisher") {
          reactNavigator("/publisher");
        }
      });
    };

    init();
  });
  return <></>;
};

export default Dashboard;
