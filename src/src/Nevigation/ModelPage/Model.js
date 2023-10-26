import React from "react";
import { NavLink } from "react-router-dom"; 
import "./Model.css";

function Model() {
  return (
    <div className="overview-container">
      <div className="progress-bar">
        <ul>
          <li><NavLink to="/Overview">Overview</NavLink></li>
          <li><NavLink to="/DataPage">Data</NavLink></li>
          <li><NavLink to="/Device">Device</NavLink></li>
          <li style={{color:"White"}}>Model</li>
        </ul>
      </div>
      <div className="content">
        <img src="your_blank_image_url.jpg" alt="Blank" />
      </div>
    </div>
  );
}

export default Model;
