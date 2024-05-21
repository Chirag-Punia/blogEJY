import React, { useEffect, useState } from 'react'
import "../styles/viewerDetails.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const ViewerDetails = () => {
  const reactNavigator = useNavigate();
    const [loading, setLoading] = useState(true);
    const [nname,setName] = useState();
    const [dob,setDob] = useState();
    const [location,setLocation] = useState();
    const [gender,setGender] = useState();
    const [phoneNo,setphoneNo] = useState();
    useEffect(async () => {
        const init = async () => {
        const email = localStorage.getItem("email");
        const base_url = "http://localhost:5000"
        var config = {
        method: "GET",
         url: `${base_url}/auth/me`,
         data :{
        email
      }
    };  
    await axios(config).then((res) => {
      const user = res.data.user;
      setName(user.name)
      setDob(user.dob);
      setLocation(user.location);
      setphoneNo(user.phoneNo);
      setGender(user.gender);
      setLoading(false);
    })
    }
    await init();  
    return (
      <></>
    ) 
     },[])
if(!loading){
return (
    <>
    <button onClick={() => {
      window.location = "/viewer";
    }}>Home</button>
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
    </div>
    </>
)
}
else{
    return (
        <h1>Loading...</h1>
    )
}

  
}
