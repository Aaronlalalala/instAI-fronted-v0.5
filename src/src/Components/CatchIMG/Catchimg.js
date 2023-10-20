
import React, { useState } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import './catch.css'; 

function Catchimg() {
  const [images, setImages] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null); 

  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/img2img/process');
      setImages(response.data);
      setError(null); // 清出錯誤
    } catch (error) {
      console.error('Error fetching data from the API:', error);
      setError('數據獲取失敗'); // 設置錯誤處理
    }
  };

  const downloadImages = async () => {
    if (images.length === 0) return;
    const zip = new JSZip();

    images.forEach((base64, index) => {
      const fileName = `image_${index + 1}.jpg`;
      zip.file(fileName, base64, { base64: true });
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'images.zip';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const downloadSingleImage = (base64, index) => {
    const link = document.createElement('a');
    link.href = base64;
    link.download = `image_${index + 1}.jpg`;
    link.click();
  };

  return (
    <div className="catch-container">
      <button onClick={fetchDataFromAPI}>拽取</button>
      <button onClick={downloadImages}>壓縮檔案</button>
      {error && <p className="error-message">{error}</p>} {/* 顯示錯誤 */}
      <div className="image-container">
        {images.map((base64, index) => (
          <div key={index} className="image-item">
            <img src={base64} alt={`Image ${index}`} loading="lazy" />
            <button onClick={() => downloadSingleImage(base64, index)}>下載</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catchimg;
