import React from "react";
import { NavLink } from "react-router-dom"; 
import "./Device.css";

function Device() {
  return (
    <div className="overview-container">
      <div className="progress-bar">
        <ul>
          <li><NavLink to="/Overview">Overview</NavLink></li>
          <li><NavLink to="/DataPage">Data</NavLink></li>
          <li style={{color:"White"}}>Device</li>
          <li><NavLink to="/Model">Model</NavLink></li>
        </ul>
      </div>
      <div className="content">
        <img src="your_blank_image_url.jpg" alt="Blank" />
      </div>
    </div>
  );
}

export default Device;
