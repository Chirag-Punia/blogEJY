import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditBlogForm } from './EditBlogForm';
export const EditBlog = () => {
    const base_url = "http://localhost:5000";
    const navigate = useNavigate();
    const [editingBlog,setEditingBlog] = useState(false);
    const [cards, setCards] = useState( );
    const [loading,setLoading] = useState(true);
    let token = localStorage.getItem("token");
    const init = async () => { var config = {
        method: "POST",
        url: `${base_url}/blog/data/me`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(config).then((res) => {
        setCards(res.data.cards);
        setLoading(false);
      })
    }
    useEffect(() => {   init(); }   )
   

  return (
    loading?<h1>loading</h1>:<>
    <button onClick={() => {window.location = "/creator"}}>Home</button>
    {cards.map((card) => (
        <div className="cards-container">
    <div className="card">
    <img src={card.image} className="cardImg" alt={card.title} />
    <div>
      <h3>{card.title}</h3>
      <p>{card.summary}</p>
      <span>{card.impressions} </span>
    </div>
    <p>{card._id}</p>
    <button onClick={()=>{navigate(`details/${card._id}`)}}>  Read more </button>
    <button style={{margin:"10px"}} onClick={() => navigate(`/editblogform/${card._id}`)}>Edit Blog</button>
   
  </div>

  </div>
    ))}
    
    </>
  )
}
