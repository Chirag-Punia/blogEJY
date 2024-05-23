import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
export const AdminPannel = () => {
    const [loading, setLoading] = useState(true);
    const [cardloading, setcardLoading] = useState(true);
    const [useer,setuseer] = useState({});
    const [cards,setCards] = useState();
  
    const init = async () => {
        const base_url = "http://localhost:5000";
        var config = {
            method: "GET",
            url: `${base_url}/detail/all`,
            
          };
          await axios.post(`${base_url}/blog/data`).then((res) => {
            setCards(res.data.cards);
          })
          await axios(config).then((res) => {
            if(res.data.user){
                setuseer(res.data.user);
                setLoading(false);
            }
          })
        }
    
    useEffect(() => {
        init();
    })
  return (
    
    loading?<h1>loading</h1>:<>
       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h2>User Details</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {useer.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.gender}</td>
                <td>{user.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Blog Details</h2>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Summary</th>
              <th>Impressions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((blog) => (
              <tr key={blog._id}>
                <td>{blog._id}</td>
                <td>{blog.title}</td>
                <td>{blog.summary}</td>
                <td>{blog.impressions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
    
  )
}
