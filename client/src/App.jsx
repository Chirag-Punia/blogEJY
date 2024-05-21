import React from "react";
import "./styles/App.css";
import Home from "./components/Home";
import Nav from "./components/Nav";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import TopicSelector from "./components/TopicSelector";
import Heading from "./components/Heading";
import Details from "./components/details";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login  from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import { Viewer } from "./components/viewer";
import { ViewerDetails } from "./components/viewerDetails";
import Admin from "./components/Admin"
import { Creator } from "./components/Creator";
export const App = () => {
  return (
    <>
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
          <Route path="/details/:idd" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/viewer" element={<Viewer/>}/>
          <Route path="/viewerDetails" element={<ViewerDetails/>}/>
          <Route path = "/admin" element={<Admin />}/>
          <Route path = "/creator" element={<Creator />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};




export default App;
