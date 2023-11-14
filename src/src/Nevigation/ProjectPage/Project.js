import React, { useState, useEffect } from "react";
import "./Project.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Project() {
  const location = useLocation();
  const userid = location.state;
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const [projectList, setprojectList] = useState([]); // State to store the list of projectnames
  //console.log(userid, id, type);
  useEffect(() => {
    if (type) {
      axios
        .get(`http://localhost:8080/api/project/getproject/?username=${id}`)
        .then((response) => {
          setprojectList(response.data); // Set the list of projectnames received from the server
        })
        .catch((error) => {
          console.error(error);
          console.error("文件讀取失敗");
        });
    } else {
      axios
        .get(`http://localhost:8080/api/project/getproject/?username=${userid}`)
        .then((response) => {
          setprojectList(response.data); // Set the list of projectnames received from the server
        })
        .catch((error) => {
          console.error(error);
          console.error("文件讀取失敗");
        });
    }
  }, []);

  const handleDeleteImage = async (index) => {
    const updatedFiles = [...projectList];
    updatedFiles.splice(index, 1);
    setprojectList(updatedFiles);
    console.log(projectList[index]);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/project/deleteproject?username=${type ? id : userid}`,
        { projectName: projectList[index].trim() } // Send data in the request body as an object
      );
      alert(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="project-page">
      <div className="header">
        <div className="user-info">
          <span>客戶權限: ???</span>
          <span>帳戶名稱: Justin</span>
        </div>
        <div className="account-actions">
          <button>設置</button>
          <NavLink to="/"><button>登出</button></NavLink>
          
        </div>
      </div>
      <h1>Project Page</h1>
      <div className="project-list">
      
        {projectList.map((projectname, index) => (
          // <NavLink to={`/Step?id=${type?id:userid}&project=${projectname}`}>
          <div className="project" key={index}>
            <h2>{projectname}</h2>
            <NavLink
              to={`/Step?id=${type ? id : userid}&project=${projectname}`}
            >
              <p>{projectname}的詳細訊息</p>
            </NavLink>
            <button onClick={() => handleDeleteImage(index)}>刪除專案</button>
          </div>
          //</NavLink>
        ))}
      </div>
      {type ? (
        <NavLink to={`/CreatePage?id=${id}`}>
          <button className="add-project-button">新增專案</button>
        </NavLink>
      ) : (
        <NavLink to={`/CreatePage?id=${userid}`}>
          <button className="add-project-button">新增專案</button>
        </NavLink>
      )}
      {/* <NavLink to={`/CreatePage?id=${type === "1" ? id : userid}`}>
        <button className="add-project-button">新增專案</button>
      </NavLink> */}
    </div>
  );
}

export default Project;

