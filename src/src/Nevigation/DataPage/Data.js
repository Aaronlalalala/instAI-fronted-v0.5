import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Data.css";
import axios from "axios";

function DataPage() {
  const [dataAvailable, setDataAvailable] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]); // 使用陣列來存儲多張圖片
  const [previewImages, setPreviewImages] = useState([]); // 用於圖片預覽
  const [selectedImages, setSelectedImages] = useState([]); // 用於選定的圖片

  // 處理檔案上傳
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const updatedFiles = [...uploadedFiles];
    const updatedPreviews = [];
    for (let i = 0; i < files.length; i++) {
      updatedFiles.push(files[i]);
      updatedPreviews.push(URL.createObjectURL(files[i]));
    }
    setUploadedFiles(updatedFiles);
    setDataAvailable(true);
    setPreviewImages(updatedPreviews);
  };

  // 模擬後端存儲檔案的方式，實際上應該將檔案上傳至後端伺服器
  const storeFilesOnServer = (files) => {
    // 這裡模擬將多個檔案上傳至伺服器的操作
    // 實際情況下，你需要將這些檔案上傳至後端伺服器，並返回檔案的儲存路徑或識別符
    // 這些資訊將用於後續的下載操作
    // 使用 Axios 或 Fetch API 將檔案發送至後端
  };

  // 下載選定的圖片
  const downloadSelectedImages = () => {
    selectedImages.forEach((index) => {
      const file = uploadedFiles[index];
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  // 切換選定的圖片
  const toggleImageSelection = (index) => {
    const selectedIndex = selectedImages.indexOf(index);
    if (selectedIndex === -1) {
      // 若選定的圖片陣列中沒有這個索引，就加入它
      setSelectedImages([...selectedImages, index]);
    } else {
      // 若選定的圖片陣列中已經有這個索引，就移除它
      const updatedSelection = [...selectedImages];
      updatedSelection.splice(selectedIndex, 1);
      setSelectedImages(updatedSelection);
    }
  };

  // 清除預覽圖片
  const clearPreviewImages = () => {
    setPreviewImages([]);
    setSelectedImages([]);
  };

  return (
    <div className="data-page">
      <div className="sidebar">
        <div className="progress-bar">
          <ul>
            <li><NavLink to="/Overview">Overview</NavLink></li>
            <li style={{ color: "white" }}> Data </li>
            <li><NavLink to="/Device">Device</NavLink></li>
            <li><NavLink to="/Model">Model</NavLink></li>
            <li><NavLink to="/MainPage">function page</NavLink></li>
          </ul>
        </div>
      </div>
      <div className="content">
        {dataAvailable ? (
          <div>
            {/* 顯示上傳訊息 */}
            <p>已經上傳資料: {uploadedFiles.length} 張圖片</p>
            <button onClick={clearPreviewImages}>清除預覽圖片</button>
            <input type="file" multiple onChange={handleImageUpload} />
            <button onClick={() => storeFilesOnServer(uploadedFiles)}>上傳文件</button>

            <div className="image-preview-container">
              {previewImages.map((preview, index) => (
                <div
                  key={index}
                  className={`image-preview ${selectedImages.includes(index) ? "selected" : ""}`}
                  onClick={() => toggleImageSelection(index)}
                >
                  <img src={preview} alt={`預覽 ${index}`} />
                </div>
              ))}
            </div>
            
            <button onClick={downloadSelectedImages}>下載選定的圖片</button>
          </div>
        ) : (
          <div>
            <p>NO DATA AVAILABLE</p>
            <input type="file" multiple onChange={handleImageUpload} />
            <button onClick={() => storeFilesOnServer(uploadedFiles)}>上傳文件</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataPage;
