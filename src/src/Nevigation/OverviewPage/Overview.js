import React from "react";
import { NavLink } from "react-router-dom"; // 假设你使用了React Router
import "./Overview.css";

function Overview() {
  return (
    <div className="overview-container">
      <div className="progress-bar">
        <ul>
          <li style={{color:"White"}}>Overview</li>
          <li><NavLink to="/DataPage">Data</NavLink></li>
          <li><NavLink to="/Device">Device</NavLink></li>
          <li><NavLink to="/Model">Model</NavLink></li>
        </ul>
      </div>
      <div className="content">
        <img src="your_blank_image_url.jpg" alt="Blank" />
      </div>
    </div>
  );
}

export default Overview;
