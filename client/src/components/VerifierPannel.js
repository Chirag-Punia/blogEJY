import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
export const VerifierPannel = () => {
  const [loading, setLoading] = useState(true);
  const [useer, setuseer] = useState({});
  const [cards, setCards] = useState();
  const handleClick = async (e) => {
    const base_url = "https://blogejy.onrender.com";
    var key = e.target.value;
    var config = {
      method: "PATCH",
      url: `${base_url}/blog/verify`,
      data: {
        ID: key,
      },
    };
    await axios(config).then((res) => {
      if (res.status === 200) {
        setCards(
          cards.map((card) => {
            if (card._id === key) {
              // Update the card's verified property
              return { ...card, verified: true };
            }
            // Return the card unchanged if ID doesn't match
            return card;
          })
        );
        toast.success("success");
      }
    });
  };
  const init = async () => {
    const base_url = "https://blogejy.onrender.com";
    var config = {
      method: "GET",
      url: `${base_url}/detail/all`,
    };
    await axios.post(`${base_url}/blog/data`).then((res) => {
      setCards(res.data.cards);
    });
    await axios(config).then((res) => {
      if (res.data.user) {
        setuseer(res.data.user);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    init();
  }, [cards]);
  return loading ? (
    <h1>loading</h1>
  ) : (
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
      <div>
        <h2>All Blog Details</h2>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Summary</th>
              <th>Title</th>
              <th>Impressions</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((blog, index) => (
              <tr key={blog._id}>
                <td>{index + 1}</td>
                <td>{blog.summary}</td>
                <td>{blog.title}</td>
                <td>{blog.impressions}</td>
                <td>
                  {blog.verified ? (
                    <button>Yes</button>
                  ) : (
                    <button value={blog._id} onClick={handleClick}>
                      {blog.verified ? "Yes" : "No"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
