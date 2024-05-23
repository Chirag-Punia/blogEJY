import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
export const AdminPannel = () => {
    const [loading, setLoading] = useState(true);
    const [useer,setuseer] = useState({});
    const [cards,setCards] = useState();
    const deleteUser = async (e) => {
      const base_url = "http://localhost:5000";
      var key = e.target.value;
      var config = {
          method: "DELETE",
          url: `${base_url}/auth/user/del`,
          data : {
              ID : key
          }
        };
        await axios(config).then((res) => {
          if(res.data == "Admin"){
            toast.error("Admin can't be deleted");
          }
          else{
            toast.success("User deleted successfully ")
          }
        })
    }
    const deleteBlog = async (e) => {
      const base_url = "http://localhost:5000";
      var key = e.target.value;
      var config = {
          method: "DELETE",
          url: `${base_url}/blog/del`,
          data : {
              ID : key
          }
        };
        await axios(config).then((res) => {
          if(res.status == 200){
            toast.success("Deleted");
          }
        
        })
    }
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
    },[useer])
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
              <th>Actions</th>
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
                <td>
                        <button value={user._id} onClick={deleteUser}>
                          Delete
                        </button>
                      </td>
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
            {cards.map((blog,index) => (
              <tr key={blog._id}>
                <td>{index+1}</td>
                <td>{blog.title}</td>
                <td>{blog.summary}</td>
                <td>{blog.impressions}</td>
                <td>
                        <button value={blog._id} onClick={deleteBlog}>
                          Delete
                        </button>
                      </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
    
  )
}
