import React from "react";
import Card from "./Card";
import state from "../data/data";

 const Home = () => {
  return (
    <div className="cards-container">
    {state.cards.map((card, index) => (
      <Card key={index} {...card} />
    ))}
  </div>
  );
};


export default Home;