import React, { useState, useEffect } from 'react';
import "../styles/EditBlogForm.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
export const EditBlogForm = () => {
    const {cardID} = useParams();
    const base_url = "http://localhost:5000";
  const [formData, setFormData] = useState();
  const [loading,setLoading] = useState(true);
  const [temp,setTemp] = useState(false);
  let token = localStorage.getItem("token");
  const init = async () => { var config = {
      method: "POST",
      url: `${base_url}/blog/data/me/edit`,
      data : {
        cardID
      }
    };
    await axios(config).then((res) => {
      setFormData(res.data.cards);
      setLoading(false);
    })
  }
  useEffect(() => {   init(); } ,[temp]  )

  const handleChange = async(e) => {
    const value  = e.target.value;
    const name = e.target.getAttribute('name');
    formData[0][name] = value;
    setFormData({
        ...formData,
        [name]: value,
      });
      setTemp(true);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    const title = formData[0].name;
    const summary = formData[0].summary;
    const impressions = formData[0].impressions;
    const image = formData[0].image;
    console.log(impressions)
    var config = {
      method: "PATCH",
      url: `${base_url}/blog/edit`,
      
      data : {
        title,
        summary,
        impressions,
        image,
        cardID
      }
    };
    await axios(config).then((res) => {
if(res.status === 200){
    toast.success("Blog edited successfully!");
    window.location = '/creator';
}
    })
  };

  return (
    loading?<h1>loading</h1>:
    <form onSubmit={handleSubmit} className="edit-blog-form">
      <label>
        Title:
        <input type="text" name="title" placeholder={formData[0].title} onChange={handleChange} />
      </label>
      <label>
        Summary:
        <textarea name="summary" placeholder={formData[0].summary} onChange={handleChange} />
      </label>
      <label>
        Impressions:
        <input type="text" name="impressions" placeholder={formData[0].impressions} onChange={handleChange} />
      </label>
      <label>
        Image URL:
        <input type="text" name="image" placeholder={formData[0].image} onChange={handleChange} />
      </label>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};


