import React, { useState } from 'react';

// 專案列表組件
function ProjectList({ projects }) {
  return (
    <div>
      <h1>專案列表</h1>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <a href={`/project/${project.id}`}>{project.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 創建專案組件
function CreateProject({ onCreateProject }) {
  const [projectName, setProjectName] = useState('');

  const handleCreateClick = () => {
    if (projectName) {
      onCreateProject(projectName);
      setProjectName('');
    }
  };

  return (
    <div>
      <h2>創建新專案</h2>
      <input
        type="text"
        placeholder="輸入專案名稱"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button onClick={handleCreateClick}>創建</button>
    </div>
  );
}

// 使用者資料組件
function UserInfo({ user }) {
  return (
    <div>
      <div>
        姓名: {user.name}
      </div>
      <div>
        Gmail: {user.email}
      </div>
      <div>
        註冊時間: {user.registrationDate}
      </div>
    </div>
  );
}

// 主應用程式組件
function Main() {
  const projects = [
    { id: 1, name: '專案1' },
    { id: 2, name: '專案2' },
    // 添加
  ];

  const user = {
    name: '使用者姓名',
    email: 'user@example.com',
    registrationDate: '2023-10-22',
  };

  const createProject = (projectName) => {
    // 在這裡處理專案創建邏輯，可以向後端發送請求
  };

  return (
    <div>
      <UserInfo user={user} />
      <CreateProject onCreateProject={createProject} />
      <ProjectList projects={projects} />
    </div>
  );
}

export default Main;
