import React, { useState } from "react";
import "./IMG.css";
import CheckPoint from "../DropBox/CheckPoint";
import Prompt from "../Prompt/Prompt";
import NegativePrompt from "../Prompt/NegativePrompt";
import Generate from "../Button/Generate";
import IntergrateCLIP from '../Button/IntergrateCLIP';
import DeepBooru from '../Button/DeepBooru';
import SamplingMethod from "../DropBox/SamplingMethod";
import SamplingStep from "../Slider/SamplingStep";
import RestoreFaces from "../CheckBox/RestoreFaces";
import Tilling from "../CheckBox/Tilling";
import Width from "../Slider/Width";
import Height from "../Slider/Height";
import BatchCount from "../Slider/BatchCount";
import BatchSize from "../Slider/BatchSize";
import CFGScale from "../Slider/CFGScale";
import Seed from "../Slider/Seed";
import Script from "../ForScript/Script"; //Alwayson scripts
import axios from 'axios'; 
import { NavLink } from "react-router-dom";
import ResizeMode from "../DropBox/ResizeMode"; 
import DenoisingS2 from "../ForHireFix/DenoisingS2";
import ForScript from "../ForScript/ForScript";
import ImageUploader from "../imgjson/ImageUploader";

function ImgPage() {
  const [images, setImages] = useState([]);
  const [dataURL,seturl] = useState([])
  const [error, setError] = useState(null);
  const [isHiresChecked, setIsHiresChecked] = useState(false); // Initialize with the default value (false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [imgData, setImgData] = useState({
    init_images: [""],
    resize_mode: 0,
    denoising_strength: 0.75,
    mask_blur: 4,
    inpaint_full_res: true,
    inpaint_full_res_padding: 32,
    inpainting_mask_invert: 0,
    initial_noise_multiplier: 0.93,
    prompt: "A cat",
    styles: [],
    seed: -1,
    batch_size: 1,
    n_iter: 1,
    steps: 20,
    cfg_scale: 7,
    width: 512,
    height: 512,
    restore_faces: false,
    tiling: false,
    negative_prompt: "",
    eta: 0,
    override_settings: { sd_model_checkpoint: "sd-v1-5-inpainting.ckpt [c6bbc15e32]" },
    sampler_index: "Euler a",
    include_init_images: false,
    alwayson_scripts:{}
  });

  // 轉換字形
  function camelCaseToSnakeCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }
  const handleHiresCheckboxChange = (value) => {
    setIsHiresChecked(value);
    }; 

  const handleFormDataChange = (fieldName, value) => {
    // if(fieldName==="init_images"){
    //   const base64Data = value; // Replace with the actual base64-encoded image data
    //   const base64string = `data:image/png;base64,${base64Data}`;
    //   value = base64string;
    // }
    setImgData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    
  
    // 查看更新
    console.log(`Field ${fieldName} updated to:`, value);
    console.log(imgData);
  };
  
  const handleGenerateClick = () => {
    const confirmed = window.confirm("确定要提交吗?");
    if (confirmed) {
      // 轉換數據請求
      const requestData = {
        method: "POST",
        request: Object.keys(imgData).reduce((acc, key) => {
          acc[camelCaseToSnakeCase(key)] = imgData[key];
          return acc;
        }, {}),
        response: {
          message: "傳輸成功",
        },
      };
      jsonFunction(requestData);
    }
  };

  const downloadSingleImage = (base64, index) => {
    const link = document.createElement('a');
    link.href = base64;
    link.download = `image_${index + 1}.jpg`;
    link.click();
  };


  // Function to fetch and encode an image as Base64
  async function encodeImageAsBase64(imageUrl) {
    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        const blob = await response.blob();
        const reader = new FileReader();
  
        reader.onload = function () {
          const base64String = reader.result.split(',')[1];
          // Use 'base64String' in your request data or wherever needed.
          console.log('Base64 image:', base64String);
        };
  
        reader.readAsDataURL(blob);
      } else {
        console.error('Failed to fetch the image.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  async function jsonFunction(imgToImgData) {
    try {
      const response = await axios.post("http://localhost:8080/api/img2img/process", imgToImgData.request);
      alert("轉換成功");
      const base64Data = response.data; // Replace with the actual base64-encoded image data
      const dataURL = `data:image/png;base64,${base64Data}`;
      seturl(dataURL);
      setImages(response.data);
      setError(null); // 清出錯誤
    } catch (error) {
      console.log("數據出錯:", error);
    }
  }

  return (
    <div className="IMGcontainer" style={{padding:20}}>
     
      <div className="img2img-title-grid">
        <div className="txt2img-InstAI-Icon" >
          <img src="/img/instai_icon.png" alt="instai" style={{height:100}}/>
        </div>

        <div className="img2img-section1">
          <div className="NavStyle">
            <span>
              <NavLink to="/TXTtoIMG">
                <button>TxtPage</button>
              </NavLink>
            </span>
         </div>
        </div>

      </div>



      <div className="img2img-first-grid">

        <div className="grid-line"></div>

        <div className="img2img-section2">
          <div >
            <CheckPoint value={imgData.override_settings.sd_model_checkpoint} onChange={(value)=>handleFormDataChange("override_settings.sd_model_checkpoint",value)} />
           </div>
        </div>

      </div>
 
      <div className="img2img-second-grid">

        <div className="img2img-section3">
          <div className="PromptStyle">
            <Prompt value={imgData.prompt} onChange={(value) => handleFormDataChange("prompt",value)} />
          </div>
        </div>

        <div className="img2img-section4">
          <div className="ButtonStyle">
            <IntergrateCLIP />
          </div>
        </div>

        <div className="img2img-section5">
          <div className="ButtonStyle">
            <Generate onClick={handleGenerateClick} />
          </div>
        </div>

        <div className="img2img-section6">
          <div className="PromptStyle">
            <NegativePrompt value={imgData.negative_prompt} onChange={(value) => handleFormDataChange("negative_prompt",value)} />
          </div>
        </div>

        <div className="img2img-section7">
         <div className="ButtonStyle">
              <DeepBooru />
           </div>
        </div>
      </div>

      <div className="img2img-third-grid">

        <div className="img2img-section9">
          <div className="DropBoxStyle">
            <ResizeMode value={imgData.resize_mode} onChange={(value) => handleFormDataChange("resize_mode",value)}/>
          </div>
        </div>
     
      <div className="img2img-fourth-grid">

        <div className="img2img-section10">
          <div className="DropBoxStyle">
            <SamplingMethod value={imgData.sampler_index} onChange={(value) => handleFormDataChange("sampler_index",value)} />
          </div>
        </div>

        <div className="img2img-section11">
          <div className="SliderStyle">
           <SamplingStep value={imgData.steps} onChange={(value) => handleFormDataChange("steps",value)} />
          </div>
        </div>

    
      </div>

      <div className="img2img-fifth-grid">
        <div className="img2img-section12">
          <div className="CheckBoxStyle">
            <RestoreFaces value={imgData.restore_faces} onChange={(value) => handleFormDataChange("restore_faces",value)}/>
          </div>
        </div>

        <div className="img2img-section13">
          <div className="CheckBoxStyle">
            <Tilling value={imgData.tiling} onChange={(value) => handleFormDataChange("tiling",value)} />
          </div>
        </div>

      </div>

      <div className="img2img-sixth-grid">

        <div className="img2img-section14">
          <div className="SliderStyle">
            <Width value={imgData.width} onChange={(value) => handleFormDataChange("width",value)} />
          </div>
        </div>

        <div className="img2img-section15">
          <div className="SliderStyle">
            <BatchCount value={imgData.n_iter} onChange={(value) => handleFormDataChange("n_iter",value)} />
          </div>
        </div>

        <div className="img2img-section16">
          <div className="SliderStyle">
            <Height value={imgData.height} onChange={(value) => handleFormDataChange("height",value)}/>
          </div>
        </div>

        <div className="img2img-section17">
          <div className="SliderStyle">
            <BatchSize value={imgData.batch_size} onChange={(value) => handleFormDataChange('batch_size', value)} />
          </div>
        </div>

      </div>

      <div className="img2img-seventh-grid">

        <div className="img2img-section18">
          <div className="SliderStyle">
            <CFGScale value={imgData.cfg_scale} onChange={(value) => handleFormDataChange("cfg_scale",value)} />
          </div>
        </div>

        <div className="img2img-section19">
          <div className="SliderStyle">
            <DenoisingS2 value={imgData.denoising_strength} onChange={(value) => handleFormDataChange("denoising_strength",value)} />
          </div>
        </div>

        <div className="img2img-section20">
          <div className="PromptStyle">
            <Seed value={imgData.seed} onChange={(value)=>handleFormDataChange("seed",value) }/>
          </div>
        </div>

        <div className="img2img-section21">
          <div className="DropBoxStyle">
            <Script onChange={(value) => handleHiresCheckboxChange(value)} />
              {isHiresChecked?(<div>
                <ForScript value={imgData.alwayson_scripts} 
                onChange={(value)=>handleFormDataChange("alwayson_scripts",value)}/>
                </div>):null}
          </div>
        </div>

        <div className="img2img-section22">
           <div>
            <ImageUploader value={imgData.init_images} onChange={(value)=>handleFormDataChange("init_images",value)}/>
           </div>
        </div>

        </div>
      </div>
      <div className="img2img-section23">
      {images.map((base64, index) => (
        <div key={index} className="image-item">
          {dataURL ? ( // Check if dataURL is not empty
            <img src={dataURL} alt={`Image ${index}`} loading="lazy" />
          ) : (
            <p>Error loading image</p>
          )}
          <button onClick={() => downloadSingleImage(dataURL, index)}>下載</button>
        </div>
      ))}
      </div>
    </div>
  );
}

export default ImgPage;

