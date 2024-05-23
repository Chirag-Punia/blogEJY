import React from "react";

const Heading = () => {
  return (
    <>
      <h1 className="heading">Explore some Health Gyan</h1>
      <div className="lang">
        <select id="languageSelector">
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>
    </>
  );
};

export default Heading;
