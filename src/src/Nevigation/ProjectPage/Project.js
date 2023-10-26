import React from "react";
import "./Project.css";
import { NavLink } from "react-router-dom";

function Project() {
  return (
    <div className="project-page">
      <div className="header">
        <div className="user-info">
          <span>客戶權限: ???</span>
          <span>帳戶名稱: Justin</span>
        </div>
        <div className="account-actions">
          <button>設置</button>  
          <button>登出</button>
         
        </div>
      </div>
      <h1>Project Page</h1>
      <div className="project-list">
        {/* 這裡應該列出所擁有的模型開發專案 */}
        <div className="project">
          <h2>Bike</h2>
          <p>BIKE的詳細信息</p>
        </div>
        <div className="project">
          <h2>春春</h2>
          <p>春春的詳細信息</p>
        </div>
        {/* 其他專案 */}
      </div>
      <NavLink to="/CreatePage">
      <button className="add-project-button" >新增專案</button>
      </NavLink>
     
    </div>
  );
}

export default Project;


/* 
1.因為這個專案葉面裡面會出現的現有專案需要討論怎麼連結 所以我只是先用渲染文字的方式示意一下
2. <div>設置與登出尚未有功能 但之後應該會是直接跳回登入註冊頁面</div>

*/