import React, { useState } from "react";
import axios from "axios"; 
import Prompt from "../../Components/Prompt/Prompt";
import {NavLink} from "react-router-dom";
function Requirement() {
  const [reqData, setReqData] = useState({
    req: "",
    // req可以继续添加，只要确定好问题就好
  });

  const handleFormDataChange = (fieldName, value) => {
    setReqData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    console.log(`Field ${fieldName} updated to:`, value);
  };

  const handleGenerateClick = () => {
    const confirmed = window.confirm("确定要提交吗?");
    if (confirmed) {
      const requestData = {
        method: "POST",
        request: reqData, 
        response: {
          message: "傳輸成功",
        },
      };
      jsonFunction(requestData);
    }
  };

  async function jsonFunction(reqData) {
    try {
      const response = await axios.post("API路徑", reqData.request); 
      alert("轉換成功");
  
    } catch (error) {
      console.log("数据出错:", error);
    
    }
  }

  return (
    <div>
      <h2>問題1</h2>
      <Prompt value={reqData.req} onChange={(value) => handleFormDataChange("req", value)} />
      <button onClick={handleGenerateClick}>提交</button>
      <br/>
      <NavLink to="/Step3"><button>done</button></NavLink>
    </div>

  );
}

export default Requirement;
