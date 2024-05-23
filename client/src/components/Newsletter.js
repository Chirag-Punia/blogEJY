import React, { useState } from "react";
import "../styles/NewsletterSubscription.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const reactNavigator = useNavigate();
  const [message, setMessage] = useState("");
  const base_url = "https://blogejy.onrender.com";
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(`${base_url}/blog/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.data === "No user") {
        toast.error("No user please signup first");
      } else {
        toast.success("Subscribed successfully");
        reactNavigator("/login");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="newsletter-subscription">
      <form onSubmit={handleSubmit}>
        <h2>Subscribe to our Newsletter</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewsLetter;
