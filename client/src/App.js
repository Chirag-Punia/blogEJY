import React from "react";
import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Nav from "./components/Nav";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import TopicSelector from "./components/TopicSelector";
import Heading from "./components/Heading";
import Details from "./components/details";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import { Viewer } from "./components/viewer";
import { UserDetails } from "./components/userDetails";
import { Creator } from "./components/Creator";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import { authState } from "./store/authState";
import { CreateBlog } from "./components/createBlog";
import { AdminPannel } from "./components/AdminPannel";
import Verifier from "./components/Verifier";
import { VerifierPannel } from "./components/VerifierPannel";
import Publisher from "./components/Publisher";
import { PublishPannel } from "./components/PublishPannel";
import { EditBlog } from "./components/EditBlog";
import { EditBlogForm } from "./components/EditBlogForm";
import { ForgotPassword } from "./components/ForgotPassword";
import NewPasswordScreen from "./components/newPassword";
import Newsletter from "./components/Newsletter";
import { Verify } from "./components/Verify";
export const App = () => {
  return (
    <>
      <RecoilRoot>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <BrowserRouter>
          <InitState />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Nav />
                  <Heading />
                  <TopicSelector />
                  <Home />
                  <FAQ />
                  <Footer />
                </>
              }
            />
            <Route path="/:role/details/:idd" element={<Details />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/viewer" element={<Viewer />} />
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/creator" element={<Creator />} />
            <Route path="/createBlog" element={<CreateBlog />} />
            <Route path="/adminPannel" element={<AdminPannel />} />
            <Route path="/verifier" element={<Verifier />} />
            <Route path="/verifyPannel" element={<VerifierPannel />} />
            <Route path="/publisher" element={<Publisher />} />
            <Route path="/publishPannel" element={<PublishPannel />} />
            <Route path="/editBlog" element={<EditBlog />} />
            <Route path="/editblogform/:cardID" element={<EditBlogForm />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/newpassword" element={<NewPasswordScreen />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};

const InitState = () => {
  const base_url = "https://blogejy.onrender.com";
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const reactNavigator = useNavigate();
  const init = async () => {
    const token = localStorage.getItem("token");
    try {
      var config = {
        method: "GET",
        url: `${base_url}/auth/me`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(config).then((res) => {
        if (res.data.user.role == "admin") {
          navigate("/admin");
          return;
        } else if (res.data.user) {
          setAuth({ token: res.data.token, user: res.data.user });
          const token = localStorage.getItem("token");
          const init = async () => {
            const base_url = "https://blogejy.onrender.com";
            var config = {
              method: "GET",
              url: `${base_url}/auth/me`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            await axios(config).then((res) => {
              const role = res.data.user.role;

              if (role === "viewer") {
                reactNavigator("/viewer");
              }
              if (role === "creator") {
                reactNavigator("/creator");
              }
              if (role === "admin") {
                reactNavigator("/admin");
              }
              if (role === "verifier") {
                reactNavigator("/verifier");
              }
              if (role === "publisher") {
                reactNavigator("/publisher");
              }
            });
          };

          init();
        } else {
          navigate("/login");
        }
      });
    } catch (e) {
      navigate("/login");
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <></>;
};

export default App;
