import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ image, title, summary, impressions, _id, isPublished }) => {
  const navigate = useNavigate();

  return isPublished ? (
    <>
      <div className="card">
        <img src={image} className="cardImg" alt={title} />
        <div>
          <h3>{title}</h3>
          <p>{summary}</p>
          <span>impressions {impressions} </span>
        </div>
        <button
          onClick={() => {
            navigate(`details/${_id}`);
          }}
        >
          {" "}
          Read more{" "}
        </button>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Card;
