import React from "react";
import {useNavigate} from "react-router-dom";

const Card = ({ image, title, summary, impressions, id }) => {

  const navigate = useNavigate();

  return(
  <div className="card">
    <img src={image} className="cardImg" alt={title} />
    <div>
      <h3>{title}</h3>
      <p>{summary}</p>
      <span>{impressions} </span>
    </div>
    <h1>{id}</h1>
    <button onClick={()=>{navigate(`details/${id}`)}}>  Read more </button>
  </div>)
};

export default Card;
