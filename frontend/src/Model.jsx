import React, { useContext } from "react";
import Class from "./components/Model/Class";
import Preview from "./components/Model/Preview";
import Training from "./components/Model/Training";
import "./Model.scss";
const Model = () => {
  return (
    <div className="model">
      <div className="wrapper">
        <div className="mainClass">
          <Class />
          <Class />
        </div>

        <div className="mainTraining">
          <Training />
        </div>
        <Preview />
      </div>
    </div>
  );
};

export default Model;
