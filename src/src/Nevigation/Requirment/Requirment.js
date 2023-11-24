import React, { useState } from "react";
import axios from "axios"; 
import Prompt from "../../Components/Prompt/Prompt2";
import { NavLink, useLocation } from "react-router-dom";

function Requirement() {
  const [reqData, setReqData] = useState({
    req: "",
  });
  const [linktostep, setlinktostep] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const projectname = searchParams.get('projectname');

  const handleFormDataChange = (fieldName, value) => {
    setReqData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    if(fieldName != ""){
      setlinktostep(true);
    }
    console.log(`Field ${fieldName} updated to:`, value);
  };

  const handleGenerateClick = async () => {
    if(reqData.req.trim() === ""){
      alert("requirements不可為空!");
    }
    else{
      const confirmed = window.confirm("確定要提交嗎?");
      if (confirmed) {
        const requestData = {
          method: "POST",
          request: reqData, 
          response: {
          message: "傳輸成功",
          },
        };
        try {
          await jsonFunction(requestData);
        } catch (error) {
          console.error("提交失敗:", error);
          // 在這裡你可以根據不同的錯誤情況提供用戶更具體的反饋
          if (error.response) {
            alert(`提交失敗，錯誤狀態碼：${error.response.status}`);
          } else {
            alert("提交失敗，請檢查網絡連接或稍後重試。");
          }
        }
      }
    } 
  };

  async function jsonFunction(reqData) {
    const response = await axios.post(`http://localhost:8080/api/upload/requirement/?username=${id}&projectname=${projectname}`, reqData);//{ requirement: reqData }
    console.log("server response:", response.data);
    alert("requirement 新增成功!");
    handleFormDataChange("req", "");
  }

  return (
    <div className="container">
      <h2>問題1</h2>
      <div className="prompt">
      <Prompt value={reqData.req} onChange={(value) => handleFormDataChange("req", value)} /> 
      </div>
      <div className="button-group">
        {linktostep?<NavLink to={`/Step?id=${id}&project=${projectname}`}><button onClick={handleGenerateClick}>提交
        </button></NavLink>:<button onClick={handleGenerateClick}>提交</button>}
        
        <br/>
        <NavLink to={`/Step?id=${id}&project=${projectname}`}><button>返回前頁</button></NavLink>
      </div>
    </div>
  );
}

export default Requirement;
