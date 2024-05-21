import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";





const Dashboard = () => {
  const reactNavigator = useNavigate();
useEffect(() => {

  const email = localStorage.getItem("email");
  const init = async () => {
    const base_url = "http://localhost:5000"
    var config = {
      method: "GET",
      url: `${base_url}/auth/me`,
      data :{
        email
      }
    };
    await axios(config).then((res) => {

      const role = res.data.user.role;
  
      if(role === "viewer"){
        reactNavigator("/viewer");
      }
      if(role === "creator"){
        reactNavigator("/creator");
      }
      if(role === "admin"){
        reactNavigator("/admin");
      }
      
    })
  }

  init();
})
  return <></>  
}

export default Dashboard;
