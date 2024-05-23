import React from 'react'
import Nav from './Nav'
import Heading from './Heading'
import TopicSelector from './TopicSelector'
import Home from './Home'
import FAQ from './FAQ'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import logo from "../images/logo.png"

export const Viewer = () => {
  const reactNavigator = useNavigate();  
  return (
    <>
      <nav className={"container"}>
      <img src={logo} alt="logo" />
      <ul>
        <li>Home</li>
        <li>Community</li>
        <li>Events</li>
        <li>Blogs</li>
        <li>About Us</li>
      </ul>
      <button>
        Join Waitlist
      </button>
      <button
        onClick={() => {
          reactNavigator("/userDetails")
        }}
      >
        User
      </button>

    </nav>
      <Heading />
      <TopicSelector />
      <Home />
      <FAQ />
      <Footer />
    </>
  )
}
