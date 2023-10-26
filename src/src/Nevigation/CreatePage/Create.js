import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Create.css";

function Create() {
  const [formData, setFormData] = useState({
    projectName: "",
    devices: [],
  });

  const handleFormDataChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    console.log(`Field ${fieldName} updated to:`, value);
  };

  const addDevice = () => {
    const newDevice = { serialNumber: "", deviceName: "" };
    setFormData((prevData) => ({
      ...prevData,
      devices: [...prevData.devices, newDevice],
    }));
  };

  const handleDeviceChange = (index, fieldName, value) => {
    const updatedDevices = [...formData.devices];
    updatedDevices[index][fieldName] = value;
    setFormData((prevData) => ({
      ...prevData,
      devices: updatedDevices,
    }));
  };

  return (
    <div>
      <div>
        <NavLink to="/Project"><button>返回專案頁面</button></NavLink>
      </div>
      <h1>新增專案</h1>
      <form>
        <div>
          <label>專案名稱：</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={(e) => handleFormDataChange("projectName", e.target.value)}
          />
        </div>
        <div>
          <label>設備：</label>
          {formData.devices.map((device, index) => (
            <div key={index}>
              <p>設備 {index + 1}：</p>
              <input
                type="text"
                placeholder="序列號"
                value={device.serialNumber}
                onChange={(e) => handleDeviceChange(index, "serialNumber", e.target.value)}
              />
              <input
                type="text"
                placeholder="名稱"
                value={device.deviceName}
                onChange={(e) => handleDeviceChange(index, "deviceName", e.target.value)}
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={addDevice}>
          新增設備
        </button>
        <button type="submit">儲存</button>
        <NavLink to="/OverView">
          <button type="button">跳過</button>
        </NavLink>
        
      </form>
    </div>
  );
}

export default Create;
