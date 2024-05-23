import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "../styles/admin.css";
export const AdminPannel = () => {
  const [loading, setLoading] = useState(true);
  const [useer, setuseer] = useState({});
  const [cards, setCards] = useState();
  const handleClick2 = async (e) => {
    const base_url = "https://blogejy.onrender.com";
    var key = e.target.value;
    var config = {
      method: "PATCH",
      url: `${base_url}/blog/publish`,
      data: {
        ID: key,
      },
    };
    await axios(config).then((res) => {
      if (res.data == "Updated") {
        setCards(
          cards.map((card) => {
            if (card._id === key) {
              return { ...card, isPublished: true };
            }
            return card;
          })
        );
        toast.success("success");
      } else if (res.data == "Not Verified") {
        toast.error("Not verified");
      }
    });
  };
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
  const deleteUser = async (e) => {
    const base_url = "https://blogejy.onrender.com";
    var key = e.target.value;
    var config = {
      method: "DELETE",
      url: `${base_url}/auth/user/del`,
      data: {
        ID: key,
      },
    };
    await axios(config).then((res) => {
      if (res.data == "Admin") {
        toast.error("Admin can't be deleted");
      } else {
        toast.success("User deleted successfully ");
      }
    });
  };
  const handleClick3 = async (e) => {
    const base_url = "https://blogejy.onrender.com";
    var key = e.target.value;
    var config = {
      method: "POST",
      url: `${base_url}/auth/user/verify`,
      data: {
        ID: key,
      },
    };
    await axios(config).then((res) => {
      if (res.data == "Verified") {
        toast.success("User is now verified");
      } else {
        toast.success("Can't Verify ");
      }
    });
  };
  const deleteBlog = async (e) => {
    const base_url = "https://blogejy.onrender.com";
    var key = e.target.value;
    var config = {
      method: "DELETE",
      url: `${base_url}/blog/del`,
      data: {
        ID: key,
      },
    };
    await axios(config).then((res) => {
      if (res.status == 200) {
        toast.success("Deleted");
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
  }, [useer]);
  return loading ? (
    <h1>loading</h1>
  ) : (
    <>
      <button
        className="c1"
        onClick={() => {
          window.location = "/";
        }}
      >
        Home
      </button>
      <div className="c2">
        <div className="c3">
          <h2 className="c4">User Details</h2>
          <table className="c5" border="1">
            <thead>
              <tr>
                <th className="c6">Name</th>
                <th className="c7">Email</th>
                <th className="c8">Role</th>
                <th className="c9">Gender</th>
                <th className="c10">Location</th>
                <th className="c11">Actions</th>
                <th className="c11">Verified</th>
              </tr>
            </thead>
            <tbody>
              {useer.map((user) => (
                <tr key={user._id}>
                  <td className="c12">{user.name}</td>
                  <td className="c13">{user.email}</td>
                  <td className="c14">{user.role}</td>
                  <td className="c15">{user.gender}</td>
                  <td className="c16">{user.location}</td>
                  <td className="c17">
                    <button
                      className="c18"
                      value={user._id}
                      onClick={deleteUser}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="c17">
                    {user.verified ? (
                      <button className="c18">Yes</button>
                    ) : (
                      <button
                        className="c18"
                        value={user._id}
                        onClick={handleClick3}
                      >
                        {user.verified ? "Yes" : "No"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="c19">
          <h2 className="c20">Blog Details</h2>
          <table className="c21" border="1">
            <thead>
              <tr>
                <th className="c22">ID</th>
                <th className="c23">Title</th>
                <th className="c24">Summary</th>
                <th className="c25">Impressions</th>
                <th className="c26">Action</th>
                <th className="c27">Verified</th>
                <th className="c28">Published</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((blog, index) => (
                <tr key={blog._id}>
                  <td className="c29">{index + 1}</td>
                  <td className="c30">{blog.title}</td>
                  <td className="c31">{blog.summary}</td>
                  <td className="c32">{blog.impressions}</td>
                  <td className="c33">
                    <button
                      className="c34"
                      value={blog._id}
                      onClick={deleteBlog}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="c35">
                    {blog.verified ? (
                      <button className="c36">Yes</button>
                    ) : (
                      <button
                        className="c37"
                        value={blog._id}
                        onClick={handleClick}
                      >
                        {blog.verified ? "Yes" : "No"}
                      </button>
                    )}
                  </td>
                  <td className="c38">
                    {blog.isPublished ? (
                      <button className="c39">Yes</button>
                    ) : (
                      <button
                        className="c40"
                        value={blog._id}
                        onClick={handleClick2}
                      >
                        {blog.isPublished ? "Yes" : "No"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
