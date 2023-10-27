import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";  // 修改R
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import MainPage from "./Nevigation/mainPage/MainPage";
import Upload from "./Components/Upload/Upload";
import Viewupload from "./Components/Upload/Viewupload";
import Bin from "./Components/Upload/Bin";
import IMGtoIMG from "./StableDiffusion/img2img/IMGtoIMG";
import TXTtoIMG from "./StableDiffusion/txt2txt/TXTtoIMG";
import Download2 from "./Components/Download2/Download";
import CatchTXT from "./StableDiffusion/CatchTXT/CatchTXT";
import Catchimg from "./StableDiffusion/CatchIMG/Catchimg";
import Project  from "./Nevigation/ProjectPage/Project";
import Datapage from "./Nevigation/DataPage/Data";
import Overview from "./Nevigation/OverviewPage/Overview";
import Model    from "./Nevigation/ModelPage/Model";
import CreatePage from "./Nevigation/CreatePage/Create";
import Device from "./Nevigation/Device/Device";
import Step from "./Nevigation/Step/Step";
function App() {
  const [userstate, setUserState] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<Register/>}></Route>
          <Route path="/MainPage" element={<MainPage/>}></Route>
          <Route path="/login" element={<Login setUserState={setUserState} />}></Route>
          <Route path="/Upload" element={<Upload/>}></Route>
          <Route path="/Bin" element={<Bin/>}></Route>
          <Route path="/Download2" element={<Download2/>}></Route>
          <Route path="/Viewupload" element={<Viewupload/>}></Route>
          <Route path="/TXTtoIMG" element={<TXTtoIMG/>}></Route>
          <Route path="/IMGtoIMG" element={<IMGtoIMG/>}></Route>
          <Route path="/CatchTXT" element={<CatchTXT/>}></Route>
          <Route path="/Catchimg" element={<Catchimg/>}></Route>
          <Route path="/Project" element={<Project/>}></Route>
          <Route path="/Datapage" element={<Datapage/>}></Route>
          <Route path="/Overview" element={<Overview/>}></Route>
          <Route path="/Model" element={<Model/>}></Route>
          <Route path="/CreatePage" element={<CreatePage/>}></Route>
          <Route path="/Device" element={<Device/>}></Route>
          <Route path="/Step" element={<Step/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
