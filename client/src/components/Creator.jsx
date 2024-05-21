import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Creator.css";
import { useNavigate } from "react-router-dom";

export const Creator = () => {
  const reactNavigator = useNavigate();
  const base_url = "http://localhost:5000";
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    summary: "",
    impressions: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/blog/create`, formData);
      if (response.status === 200) {
        toast.success("Blog added successfully!");
        setFormData({
          image: "",
          title: "",
          summary: "",
          impressions: "",
        });
      }
    } catch (error) {
      console.error("Error adding card:", error);
      toast.error("Failed to add card");
    }
  };
  return (
    <>
    <button onClick={() => {
      reactNavigator("/");
    }}>Home</button>
     
    <div className="new-card-form">
      <h2>Add New Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="new-form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="new-form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="new-form-group">
          <label htmlFor="summary">Summary:</label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="new-form-group">
          <label htmlFor="impressions">Impressions:</label>
          <input
            type="text"
            id="impressions"
            name="impressions"
            value={formData.impressions}
            onChange={handleChange}
            required
          />
        </div>
        <button className="bbutton" type="submit">Add Card</button>
      </form>
    </div>
    </>
    
  )
}
